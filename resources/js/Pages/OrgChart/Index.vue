<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as d3 from 'd3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object, chartData: Array, roles: Array });

const svgRef = ref(null);
const containerRef = ref(null);

const criticalityColors = {
    low: '#9ca3af',
    medium: '#6366f1',
    high: '#f59e0b',
    critical: '#ef4444',
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

    const svg = d3.select(svgRef.value)
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', 'translate(100, 80)');

    const zoom = d3.zoom()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => g.attr('transform', event.transform));

    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(100, 80));

    // Links
    g.selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#c7d2fe')
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
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Node rectangles
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
            return '#c7d2fe';
        })
        .attr('stroke-width', 1.5)
        .style('filter', 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))');

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
};

onMounted(() => renderChart());
watch(() => props.chartData, () => renderChart(), { deep: true });
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <Link :href="route('organizations.show', organization.id)" class="hover:text-indigo-600">{{ organization.name }}</Link>
                <span>/</span>
                <span class="text-gray-900 font-semibold">{{ t('chart.title') }}</span>
            </div>
        </template>
        <Head :title="t('chart.title')" />

        <div v-if="!chartData?.length" class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
            <p class="text-gray-500 mb-4">{{ t('chart.empty') }}</p>
            <Link :href="route('organizations.roles.create', organization.id)" class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                {{ t('roles.create') }}
            </Link>
        </div>

        <div v-else ref="containerRef" class="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm overflow-hidden" style="min-height: 600px;">
            <svg ref="svgRef" class="w-full" style="min-height: 600px;"></svg>
        </div>

        <!-- Legend -->
        <div v-if="chartData?.length" class="mt-4 flex flex-wrap items-center gap-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-gray-400"></div>
                <span class="text-xs text-gray-600">{{ t('roles.low') }}</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-indigo-500"></div>
                <span class="text-xs text-gray-600">{{ t('roles.medium') }}</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-amber-500"></div>
                <span class="text-xs text-gray-600">{{ t('roles.high') }}</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-red-500"></div>
                <span class="text-xs text-gray-600">{{ t('roles.critical') }}</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="h-4 w-6 rounded border border-amber-300 bg-amber-50"></div>
                <span class="text-xs text-gray-600">{{ t('chart.vacant') }}</span>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
