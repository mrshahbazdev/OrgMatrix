<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as d3 from 'd3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object, chartData: Array, roles: Array });

const svgRef = ref(null);
const containerRef = ref(null);
const isFullscreen = ref(false);
let zoomBehavior = null;
let svgSelection = null;

const criticalityColors = {
    low: '#9ca3af',
    medium: '#6366f1',
    high: '#f59e0b',
    critical: '#ef4444',
};

const departmentColors = [
    '#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#f97316', '#14b8a6', '#e11d48', '#3b82f6',
    '#84cc16', '#a855f7',
];
const deptColorMap = {};
let deptIndex = 0;

const getDeptColor = (dept) => {
    if (!dept) return '#a5b4fc';
    if (!deptColorMap[dept]) {
        deptColorMap[dept] = departmentColors[deptIndex % departmentColors.length];
        deptIndex++;
    }
    return deptColorMap[dept];
};

const renderChart = () => {
    if (!svgRef.value || !props.chartData?.length) return;

    const container = containerRef.value;
    const width = container.clientWidth;
    const height = Math.max(600, container.clientHeight);

    d3.select(svgRef.value).selectAll('*').remove();

    const treeData = {
        name: props.organization.name,
        children: props.chartData,
    };

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree().size([width - 200, height - 160]);
    treeLayout(root);

    svgSelection = d3.select(svgRef.value)
        .attr('width', width)
        .attr('height', height);

    const g = svgSelection.append('g')
        .attr('transform', 'translate(100, 80)');

    zoomBehavior = d3.zoom()
        .scaleExtent([0.2, 4])
        .on('zoom', (event) => g.attr('transform', event.transform));

    svgSelection.call(zoomBehavior);
    svgSelection.call(zoomBehavior.transform, d3.zoomIdentity.translate(100, 80));

    // Links
    g.selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', d => {
            const dept = d.target.data.department;
            return dept ? getDeptColor(dept) + '60' : '#c7d2fe';
        })
        .attr('stroke-width', 2)
        .attr('d', d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y)
        );

    // Nodes
    const nodes = g.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('cursor', d => d.data.role_id ? 'pointer' : 'default');

    // Click-to-edit
    nodes.on('click', (event, d) => {
        if (d.data.role_id) {
            router.visit(route('organizations.roles.edit', [props.organization.id, d.data.role_id]));
        }
    });

    // Node rectangles with department colors
    nodes.append('rect')
        .attr('x', -80)
        .attr('y', -25)
        .attr('width', 160)
        .attr('height', 55)
        .attr('rx', 12)
        .attr('fill', d => {
            if (!d.parent) return '#4f46e5';
            if (!d.data.person) return '#fef3c7';
            return '#e0e7ff';
        })
        .attr('stroke', d => {
            if (!d.parent) return '#4338ca';
            if (!d.data.person) return '#fde68a';
            const dept = d.data.department;
            return dept ? getDeptColor(dept) : '#c7d2fe';
        })
        .attr('stroke-width', d => d.data.department ? 2.5 : 1.5)
        .style('filter', 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))');

    // Department color strip
    nodes.filter(d => d.data.department)
        .append('rect')
        .attr('x', -80)
        .attr('y', -25)
        .attr('width', 5)
        .attr('height', 55)
        .attr('rx', 2)
        .attr('fill', d => getDeptColor(d.data.department));

    // Risk indicator for vacant high/critical roles
    nodes.filter(d => !d.data.person && d.data.criticality && ['high', 'critical'].includes(d.data.criticality))
        .append('g')
        .attr('transform', 'translate(-72, -32)')
        .each(function() {
            d3.select(this).append('circle').attr('r', 9).attr('fill', '#fef2f2').attr('stroke', '#ef4444');
            d3.select(this).append('text').attr('text-anchor', 'middle').attr('y', 4).attr('font-size', '12px').attr('font-weight', 'bold').attr('fill', '#ef4444').text('!');
        });

    // No-backup warning for filled high/critical roles without successor
    nodes.filter(d => d.parent && d.data.person && d.data.criticality && ['high', 'critical'].includes(d.data.criticality) && !d.data.has_backup)
        .append('g')
        .attr('transform', 'translate(72, -32)')
        .each(function() {
            d3.select(this).append('rect').attr('x', -22).attr('y', -8).attr('width', 44).attr('height', 16).attr('rx', 8).attr('fill', '#fef3c7').attr('stroke', '#f59e0b');
            d3.select(this).append('text').attr('text-anchor', 'middle').attr('y', 4).attr('font-size', '7px').attr('font-weight', '600').attr('fill', '#92400e').text(t('roles.no_backup'));
        });

    // Successor count badge
    nodes.filter(d => d.parent && d.data.successors?.length > 0)
        .append('g')
        .attr('transform', 'translate(-72, 20)')
        .each(function(d) {
            d3.select(this).append('rect').attr('x', -16).attr('y', -8).attr('width', 32).attr('height', 16).attr('rx', 8).attr('fill', '#ecfdf5').attr('stroke', '#10b981');
            d3.select(this).append('text').attr('text-anchor', 'middle').attr('y', 4).attr('font-size', '8px').attr('font-weight', '600').attr('fill', '#065f46').text(`${d.data.successors.length} ✓`);
        });

    // Criticality indicator
    nodes.filter(d => d.data.criticality)
        .append('circle')
        .attr('cx', 72)
        .attr('cy', -17)
        .attr('r', 6)
        .attr('fill', d => criticalityColors[d.data.criticality] || '#9ca3af');

    // Role name
    nodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -5)
        .attr('font-size', '11px')
        .attr('font-weight', '600')
        .attr('fill', d => !d.parent ? '#ffffff' : '#1e1b4b')
        .text(d => {
            const name = d.data.name || '';
            return name.length > 18 ? name.substring(0, 16) + '...' : name;
        });

    // Person name
    nodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 14)
        .attr('font-size', '9px')
        .attr('fill', d => {
            if (!d.parent) return 'rgba(255,255,255,0.7)';
            if (!d.data.person) return '#b45309';
            return '#6366f1';
        })
        .text(d => {
            if (!d.parent) return '';
            if (!d.data.person) return t('chart.vacant');
            const name = d.data.person.name || '';
            return name.length > 22 ? name.substring(0, 20) + '...' : name;
        });

    // Tooltip
    nodes.append('title')
        .text(d => {
            if (!d.parent) return props.organization.name;
            let tip = d.data.name;
            if (d.data.department) tip += ` | ${d.data.department}`;
            if (d.data.person) tip += `\n${d.data.person.name}`;
            else tip += `\n${t('chart.vacant')}`;
            if (d.data.criticality) tip += `\n${t('roles.criticality')}: ${t('roles.' + d.data.criticality)}`;
            if (d.data.successors?.length) {
                tip += `\n${t('succession.title')}: ${d.data.successors.length}`;
                d.data.successors.forEach(s => {
                    tip += `\n  • ${s.person_name} (${t('succession.' + s.horizon)}, ${t('succession.readiness')}: ${s.readiness || '-'}/5)`;
                });
            } else if (d.parent && d.data.criticality && ['high', 'critical'].includes(d.data.criticality) && !d.data.has_backup) {
                tip += `\n⚠ ${t('roles.no_backup')}`;
            }
            tip += `\n${t('chart.click_to_edit')}`;
            return tip;
        });
};

const zoomIn = () => {
    if (svgSelection && zoomBehavior) svgSelection.transition().duration(300).call(zoomBehavior.scaleBy, 1.3);
};
const zoomOut = () => {
    if (svgSelection && zoomBehavior) svgSelection.transition().duration(300).call(zoomBehavior.scaleBy, 0.7);
};
const resetZoom = () => {
    if (svgSelection && zoomBehavior) svgSelection.transition().duration(300).call(zoomBehavior.transform, d3.zoomIdentity.translate(100, 80));
};

const toggleFullscreen = () => {
    const el = containerRef.value;
    if (!document.fullscreenElement) {
        el.requestFullscreen?.();
        isFullscreen.value = true;
    } else {
        document.exitFullscreen?.();
        isFullscreen.value = false;
    }
};

const printChart = () => {
    const svg = svgRef.value;
    if (!svg) return;

    const clonedSvg = svg.cloneNode(true);
    const bbox = svg.getBBox();
    const padding = 40;
    clonedSvg.setAttribute('viewBox', `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`);
    clonedSvg.setAttribute('width', bbox.width + padding * 2);
    clonedSvg.setAttribute('height', bbox.height + padding * 2);
    clonedSvg.removeAttribute('transform');

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${props.organization.name} — ${t('chart.title')}</title>
            <style>
                @media print { @page { size: landscape; margin: 10mm; } }
                body { margin: 0; display: flex; flex-direction: column; align-items: center; font-family: sans-serif; }
                h1 { font-size: 18px; margin: 16px 0 8px; color: #1e1b4b; }
                p { font-size: 11px; color: #6b7280; margin: 0 0 12px; }
                svg { max-width: 100%; height: auto; }
            </style>
        </head>
        <body>
            <h1>${props.organization.name}</h1>
            <p>${t('chart.title')} — ${new Date().toLocaleDateString()}</p>
            ${svgData}
            <script>window.onload = () => { window.print(); }<\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
};

const exportPng = () => {
    const svg = svgRef.value;
    if (!svg) return;

    const clonedSvg = svg.cloneNode(true);
    const bbox = svg.getBBox();
    const padding = 40;
    const w = bbox.width + padding * 2;
    const h = bbox.height + padding * 2;
    clonedSvg.setAttribute('viewBox', `${bbox.x - padding} ${bbox.y - padding} ${w} ${h}`);
    clonedSvg.setAttribute('width', w * 2);
    clonedSvg.setAttribute('height', h * 2);
    clonedSvg.removeAttribute('transform');

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const canvas = document.createElement('canvas');
    canvas.width = w * 2;
    canvas.height = h * 2;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const a = document.createElement('a');
        a.download = `${props.organization.name}-org-chart.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
};

onMounted(() => {
    renderChart();
    document.addEventListener('fullscreenchange', () => {
        isFullscreen.value = !!document.fullscreenElement;
        setTimeout(renderChart, 100);
    });
});
watch(() => props.chartData, () => renderChart(), { deep: true });
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link :href="route('organizations.show', organization.id)" class="hover:text-indigo-600">{{ organization.name }}</Link>
                <span>/</span>
                <span class="text-gray-900 dark:text-white font-semibold">{{ t('chart.title') }}</span>
            </div>
        </template>
        <Head :title="t('chart.title')" />

        <div v-if="!chartData?.length" class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center">
            <p class="text-gray-500 dark:text-gray-400 mb-4">{{ t('chart.empty') }}</p>
            <Link :href="route('organizations.roles.create', organization.id)" class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                {{ t('roles.create') }}
            </Link>
        </div>

        <div v-else>
            <!-- Zoom Controls -->
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <button @click="zoomIn" class="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition" :title="t('chart.zoom_in')">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    </button>
                    <button @click="zoomOut" class="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition" :title="t('chart.zoom_out')">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                    </button>
                    <button @click="resetZoom" class="flex h-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        {{ t('chart.reset') }}
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    <button @click="printChart" class="flex h-9 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition" :title="t('chart.print')">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        {{ t('chart.print') }}
                    </button>
                    <button @click="exportPng" class="flex h-9 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition" :title="t('chart.export_png')">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        {{ t('chart.export_png') }}
                    </button>
                    <button @click="toggleFullscreen" class="flex h-9 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!isFullscreen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4H4m0 0l5 5m6-1V4h4m0 0l-5 5M9 15v5H4m0 0l5-5m6 1v4h5m0 0l-5-5" />
                    </svg>
                    {{ isFullscreen ? t('chart.exit_fullscreen') : t('chart.fullscreen') }}
                    </button>
                </div>
            </div>

            <div ref="containerRef" class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm overflow-hidden" style="min-height: 600px;">
                <svg ref="svgRef" class="w-full" style="min-height: 600px;"></svg>
            </div>

            <!-- Legend -->
            <div class="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
                <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{{ t('roles.criticality') }}:</span>
                <div class="flex items-center gap-2">
                    <div class="h-3 w-3 rounded-full bg-gray-400"></div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ t('roles.low') }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-3 w-3 rounded-full bg-indigo-500"></div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ t('roles.medium') }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ t('roles.high') }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-3 w-3 rounded-full bg-red-500"></div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ t('roles.critical') }}</span>
                </div>
                <div class="border-l border-gray-200 dark:border-gray-600 pl-4 flex items-center gap-2">
                    <div class="h-4 w-6 rounded border border-amber-300 bg-amber-50"></div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ t('chart.vacant') }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-50 text-[8px] font-bold text-red-500">!</div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ t('roles.at_risk') }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-4 w-8 rounded-full border border-amber-400 bg-amber-50 flex items-center justify-center text-[7px] font-semibold text-amber-800">{{ t('roles.no_backup') }}</div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-4 w-8 rounded-full border border-emerald-400 bg-emerald-50 flex items-center justify-center text-[8px] font-semibold text-emerald-800">1 &#10003;</div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ t('succession.has_successor') }}</span>
                </div>

                <!-- Department Colors -->
                <template v-if="Object.keys(deptColorMap).length">
                    <div class="border-l border-gray-200 dark:border-gray-600 pl-4">
                        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{{ t('roles.department') }}:</span>
                    </div>
                    <div v-for="(color, dept) in deptColorMap" :key="dept" class="flex items-center gap-2">
                        <div class="h-3 w-3 rounded-sm" :style="{ backgroundColor: color }"></div>
                        <span class="text-xs text-gray-600 dark:text-gray-400">{{ dept }}</span>
                    </div>
                </template>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
