import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function KubernetesArchitecture() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // SVG dimensions - more landscape oriented
    const width = 1400;
    const height = 780;
    const margin = { top: 50, right: 20, bottom: 20, left: 20 };

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // Add custom font styling
    svg.append('style').text(`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap');
      text {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        paint-order: stroke;
        stroke: rgba(255, 255, 255, 0.6);
        stroke-width: 0.7px;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .component-text {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.2px;
      }
      .section-title {
        font-size: 18px;
        font-weight: 800;
        letter-spacing: 0.2px;
        stroke-width: 1px;
      }
      .main-title {
        font-size: 32px;
        font-weight: 800;
        letter-spacing: -0.5px;
        stroke-width: 1.5px;
        text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
      }
      .caption {
        font-size: 14px;
        font-weight: 600;
      }
      .vertical-text {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.3px;
      }
      .tooltip-text {
        font-size: 12px;
        font-weight: 600;
        fill: white;
        stroke: none;
      }
    `);

    // Define the main sections of the architecture - more spread out for landscape
    const sections = [
      { id: "master", name: "Control plane - Master Node", x: 100, y: 100, width: 650, height: 650, color: "#326ce5" },
      { id: "worker", name: "Worker Node-1", x: 830, y: 180, width: 450, height: 340, color: "#3ddc84" }
    ];

    // Define external entities - adjusted for landscape
    const externalEntities = [
      { id: "developer", name: "Developer", x: 1000, y: 30, width: 100, height: 30, color: "#62aeef", type: "external" },
      { id: "user", name: "User", x: 1150, y: 30, width: 60, height: 30, color: "#62aeef", type: "external" },
      { id: "cloudprovider", name: "CloudProvider API", x: 20, y: 70, width: 120, height: 30, color: "#62aeef", type: "external" }
    ];

    // Define master components - Control Plane - adjusted for landscape
    const masterComponents = [
      { id: "ccm", name: "Cloud Control Manager", x: 220, y: 150, width: 170, height: 30, color: "#62aeef", type: "master" },
      { id: "api-server", name: "api-server", x: 250, y: 240, width: 120, height: 30, color: "#62aeef", type: "master" },
      { id: "etcd", name: "etcd", x: 150, y: 240, width: 70, height: 30, color: "#62aeef", type: "master" },
      { id: "scheduler", name: "Scheduler", x: 160, y: 320, width: 100, height: 30, color: "#62aeef", type: "master" },
      { id: "controller-manager", name: "Controller Manager", x: 280, y: 320, width: 150, height: 30, color: "#62aeef", type: "master" },
      
      // Controllers - widened for text
      { id: "node-controller", name: "Node Controller", x: 470, y: 180, width: 120, height: 30, color: "#62aeef", type: "controller" },
      { id: "replication-controller", name: "Replication Controller", x: 470, y: 220, width: 150, height: 30, color: "#62aeef", type: "controller" },
      { id: "endpoints-controller", name: "Endpoints Controller", x: 470, y: 260, width: 140, height: 30, color: "#62aeef", type: "controller" },
      { id: "service-account-controller", name: "Service Account Controller", x: 470, y: 300, width: 170, height: 30, color: "#62aeef", type: "controller" },
      { id: "deployment-controller", name: "Deployment Controller", x: 470, y: 340, width: 150, height: 30, color: "#62aeef", type: "controller" },
      { id: "statefulset-controller1", name: "Statefulset Controller", x: 470, y: 380, width: 150, height: 30, color: "#62aeef", type: "controller" },
      { id: "daemonset-controller", name: "Daemonset Controller", x: 470, y: 420, width: 140, height: 30, color: "#62aeef", type: "controller" },
      { id: "statefulset-controller2", name: "Statefulset Controller", x: 470, y: 460, width: 150, height: 30, color: "#62aeef", type: "controller" },
      { id: "job-controller", name: "Job Controller", x: 470, y: 500, width: 120, height: 30, color: "#62aeef", type: "controller" },
      { id: "cronjob-controller", name: "CronJob Controller", x: 470, y: 540, width: 140, height: 30, color: "#62aeef", type: "controller" },
      { id: "hpa-controller", name: "Horizontal Pod Autoscaler", x: 470, y: 580, width: 180, height: 30, color: "#62aeef", type: "controller" },
      { id: "crds-controller", name: "Custom Resource Definitions", x: 470, y: 620, width: 180, height: 30, color: "#62aeef", type: "controller" },
      
      // Admission controllers and webhooks - adjusted width
      { id: "admission-controller", name: "Admission Controller", x: 650, y: 220, width: 140, height: 40, color: "#e57373", type: "webhook" },
      { id: "validating-webhook", name: "validating webhook", x: 650, y: 280, width: 140, height: 40, color: "#e57373", type: "webhook" },
      { id: "mutation-webhook", name: "mutation webhook", x: 650, y: 340, width: 140, height: 40, color: "#e57373", type: "webhook" },
      { id: "resource-webhook", name: "Resource webhook", x: 650, y: 400, width: 140, height: 40, color: "#e57373", type: "webhook" },
      { id: "limit-ranger", name: "limit Ranger", x: 650, y: 460, width: 120, height: 40, color: "#e57373", type: "webhook" }
    ];

    // Define worker node components - adjusted for landscape
    const workerComponents = [
      { id: "kubelet", name: "Kubelet", x: 850, y: 320, width: 80, height: 30, color: "#9ee493", type: "worker" },
      { id: "container-runtime", name: "container runtime", x: 960, y: 240, width: 130, height: 30, color: "#9ee493", type: "worker" },
      { id: "kube-proxy", name: "kube-proxy", x: 960, y: 320, width: 100, height: 30, color: "#9ee493", type: "worker" },
      { id: "network-plugin", name: "network Plugin", x: 960, y: 360, width: 120, height: 30, color: "#9ee493", type: "worker" },
      { id: "volume-plugin", name: "Volume Plugin", x: 960, y: 400, width: 110, height: 30, color: "#9ee493", type: "worker" },
      { id: "cni", name: "CNI", x: 960, y: 440, width: 80, height: 30, color: "#9ee493", type: "worker" },
      { id: "ingress", name: "Ingress Controller", x: 850, y: 140, width: 130, height: 30, color: "#9ee493", type: "worker" },
      { id: "pod", name: "Pod", x: 1120, y: 220, width: 60, height: 30, color: "#9ee493", type: "worker" },
      
      // Pod containers
      { id: "init-container", name: "Init Container", x: 1120, y: 300, width: 110, height: 30, color: "#ffd54f", type: "container" },
      { id: "app-container", name: "App Container", x: 1120, y: 340, width: 110, height: 30, color: "#ffd54f", type: "container" },
      { id: "sidecar-container", name: "Sidecar Container", x: 1120, y: 380, width: 120, height: 30, color: "#ffd54f", type: "container" },
      
      // Storage components
      { id: "storage", name: "Storage", x: 1250, y: 220, width: 90, height: 30, color: "#ba68c8", type: "storage" },
      { id: "pv", name: "persistent Volumes", x: 1250, y: 270, width: 130, height: 30, color: "#ba68c8", type: "storage" },
      { id: "pvc", name: "persistent Volume Claims", x: 1250, y: 320, width: 150, height: 30, color: "#ba68c8", type: "storage" },
      { id: "csi", name: "Container Storage Interface", x: 1250, y: 370, width: 150, height: 30, color: "#ba68c8", type: "storage" }
    ];

    // Define external/interface components - adjusted width
    const interfaceComponents = [
      { id: "kubectl", name: "kubectl CLI / API / Dashboard", x: 580, y: 100, width: 250, height: 30, color: "#64b5f6", type: "interface" }
    ];

    // Animation entry timeline
    const entryDuration = 1500;
    
    // Initial fade-in animation for main title
    svg.append('text')
      .attr('class', 'main-title')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333')
      .text('Kubernetes Architecture')
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1);

    // Add initial fade-in animation for sections
    const sectionsG = svg.append('g')
      .attr('class', 'sections');

    sectionsG.selectAll('.section')
      .data(sections)
      .enter()
      .append('rect')
      .attr('class', 'section')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', d => `${d.color}10`) // Use color with transparency
      .attr('stroke', d => d.color)
      .attr('stroke-width', 3) // Bolder border
      .attr('stroke-dasharray', '8,4') // More visible dash pattern
      .style('opacity', 0)
      .transition()
      .duration(entryDuration)
      .delay((d, i) => i * 150)
      .style('opacity', 1);

    // Add section titles with animation
    sectionsG.selectAll('.section-title')
      .data(sections)
      .enter()
      .append('text')
      .attr('class', 'section-title')
      .attr('x', d => d.x + 20)
      .attr('y', d => d.y + 30)
      .attr('text-anchor', 'start')
      .attr('fill', d => d.color)
      .text(d => d.name)
      .style('opacity', 0)
      .transition()
      .duration(entryDuration)
      .delay((d, i) => i * 150 + 200)
      .style('opacity', 1);

    // Create a group for components
    const componentsG = svg.append('g')
      .attr('class', 'components');

    // Create and animate master components
    componentsG.selectAll('.master-component')
      .data(masterComponents)
      .enter()
      .append('rect')
      .attr('class', d => `component ${d.type}-component`)
      .attr('id', d => d.id)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', d => `${d.color}40`) // Use color with transparency
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2) // Bolder border
      .attr('stroke-dasharray', '4,2') // More visible dash pattern
      .style('opacity', 0)
      .transition()
      .duration(entryDuration)
      .delay((d, i) => 300 + i * 20)
      .style('opacity', 1);

    // Create worker components with animation
    componentsG.selectAll('.worker-component')
      .data(workerComponents)
      .enter()
      .append('rect')
      .attr('class', d => `component ${d.type}-component`)
      .attr('id', d => d.id)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', d => `${d.color}40`) // Use color with transparency
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2) // Bolder border
      .attr('stroke-dasharray', '4,2') // More visible dash pattern
      .style('opacity', 0)
      .transition()
      .duration(entryDuration)
      .delay((d, i) => 600 + i * 20)
      .style('opacity', 1);

    // Create interface components with animation
    componentsG.selectAll('.interface-component')
      .data(interfaceComponents)
      .enter()
      .append('rect')
      .attr('class', d => `component ${d.type}-component`)
      .attr('id', d => d.id)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', d => `${d.color}40`) // Use color with transparency
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2) // Bolder border
      .attr('stroke-dasharray', '4,2') // More visible dash pattern
      .style('opacity', 0)
      .transition()
      .duration(entryDuration)
      .delay((d, i) => 400 + i * 20)
      .style('opacity', 1);

    // Create external entities with animation
    componentsG.selectAll('.external-entity')
      .data(externalEntities)
      .enter()
      .append('rect')
      .attr('class', 'component external-component')
      .attr('id', d => d.id)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', d => `${d.color}40`) // Use color with transparency
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2) // Bolder border
      .attr('stroke-dasharray', '4,2') // More visible dash pattern
      .style('opacity', 0)
      .transition()
      .duration(entryDuration)
      .delay((d, i) => 200 + i * 20)
      .style('opacity', 1);

    // Add hover effects to all components
    svg.selectAll('.component')
      .on('mouseover', function(event, d) {
        // Highlight the component
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', d => `${d.color}80`)
          .attr('stroke-width', 3);

        // Highlight related connections
        svg.selectAll(`.connection-${d.id}`)
          .transition()
          .duration(200)
          .attr('stroke-width', 2.5)
          .attr('stroke', d.color)
          .style('stroke-dasharray', '6,2');
          
        // Show tooltip with component name and type
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .attr('id', `tooltip-${d.id}`);
          
        const tooltipRect = tooltip.append('rect')
          .attr('x', d.x + d.width / 2)
          .attr('y', d.y - 35)
          .attr('rx', 4)
          .attr('ry', 4)
          .attr('fill', 'rgba(0,0,0,0.85)')
          .attr('width', 160)
          .attr('height', 30);
          
        tooltip.append('text')
          .attr('class', 'tooltip-text')
          .attr('x', d.x + d.width / 2 + 80)
          .attr('y', d.y - 15)
          .attr('text-anchor', 'middle')
          .text(`${d.name} (${d.type})`);
          
        tooltip.style('opacity', 0)
          .transition()
          .duration(200)
          .style('opacity', 1);
      })
      .on('mouseout', function(event, d) {
        // Restore component appearance
        d3.select(this)
          .transition()
          .duration(300)
          .attr('fill', d => `${d.color}40`)
          .attr('stroke-width', 2);
        
        // Restore connections
        svg.selectAll(`.connection-${d.id}`)
          .transition()
          .duration(300)
          .attr('stroke-width', 1.5)
          .attr('stroke', '#333')
          .style('stroke-dasharray', '4,2');
          
        // Remove tooltip
        svg.select(`#tooltip-${d.id}`).remove();
      });

    // More accurate text background sizing function
    function getTextWidth(text, fontSize) {
      return text.length * (fontSize * 0.6);
    }

    // Add component text for master components
    svg.selectAll('.master-component-text')
      .data(masterComponents)
      .enter()
      .append('g')
      .attr('class', 'text-group')
      .attr('transform', d => `translate(${d.x + d.width / 2}, ${d.y + d.height / 2 + 5})`)
      .each(function(d, i) {
        const textWidth = getTextWidth(d.name, 11);
        // Add text background for better readability
        d3.select(this)
          .append('rect')
          .attr('x', -textWidth/2 - 4)
          .attr('y', -9)
          .attr('width', textWidth + 8)
          .attr('height', 18)
          .attr('rx', 3)
          .attr('fill', 'rgba(255, 255, 255, 0.85)')
          .attr('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(300 + i * 20 + 100)
          .attr('opacity', 0.8);
          
        // Add the text on top of background
        d3.select(this)
          .append('text')
          .attr('class', 'component-text')
          .attr('text-anchor', 'middle')
          .attr('fill', '#333333')
          .text(d.name)
          .style('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(300 + i * 20 + 150)
          .style('opacity', 1);
      });

    // Add component text for worker components
    svg.selectAll('.worker-component-text')
      .data(workerComponents)
      .enter()
      .append('g')
      .attr('class', 'text-group')
      .attr('transform', d => `translate(${d.x + d.width / 2}, ${d.y + d.height / 2 + 5})`)
      .each(function(d, i) {
        const textWidth = getTextWidth(d.name, 11);
        // Add text background for better readability
        d3.select(this)
          .append('rect')
          .attr('x', -textWidth/2 - 4)
          .attr('y', -9)
          .attr('width', textWidth + 8)
          .attr('height', 18)
          .attr('rx', 3)
          .attr('fill', 'rgba(255, 255, 255, 0.85)')
          .attr('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(600 + i * 20 + 100)
          .attr('opacity', 0.8);
          
        // Add the text on top of background
        d3.select(this)
          .append('text')
          .attr('class', 'component-text')
          .attr('text-anchor', 'middle')
          .attr('fill', '#333333')
          .text(d.name)
          .style('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(600 + i * 20 + 150)
          .style('opacity', 1);
      });

    // Add component text for interface components
    svg.selectAll('.interface-component-text')
      .data(interfaceComponents)
      .enter()
      .append('g')
      .attr('class', 'text-group')
      .attr('transform', d => `translate(${d.x + d.width / 2}, ${d.y + d.height / 2 + 5})`)
      .each(function(d, i) {
        const textWidth = getTextWidth(d.name, 11);
        // Add text background for better readability
        d3.select(this)
          .append('rect')
          .attr('x', -textWidth/2 - 4)
          .attr('y', -9)
          .attr('width', textWidth + 8)
          .attr('height', 18)
          .attr('rx', 3)
          .attr('fill', 'rgba(255, 255, 255, 0.85)')
          .attr('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(400 + i * 20 + 100)
          .attr('opacity', 0.8);
          
        // Add the text on top of background
        d3.select(this)
          .append('text')
          .attr('class', 'component-text')
          .attr('text-anchor', 'middle')
          .attr('fill', '#333333')
          .text(d.name)
          .style('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(400 + i * 20 + 150)
          .style('opacity', 1);
      });

    // Add component text for external entities
    svg.selectAll('.external-entity-text')
      .data(externalEntities)
      .enter()
      .append('g')
      .attr('class', 'text-group')
      .attr('transform', d => `translate(${d.x + d.width / 2}, ${d.y + d.height / 2 + 5})`)
      .each(function(d, i) {
        const textWidth = getTextWidth(d.name, 11);
        // Add text background for better readability
        d3.select(this)
          .append('rect')
          .attr('x', -textWidth/2 - 4)
          .attr('y', -9)
          .attr('width', textWidth + 8)
          .attr('height', 18)
          .attr('rx', 3)
          .attr('fill', 'rgba(255, 255, 255, 0.85)')
          .attr('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(200 + i * 20 + 100)
          .attr('opacity', 0.8);
          
        // Add the text on top of background
        d3.select(this)
          .append('text')
          .attr('class', 'component-text')
          .attr('text-anchor', 'middle')
          .attr('fill', '#333333')
          .text(d.name)
          .style('opacity', 0)
          .transition()
          .duration(entryDuration)
          .delay(200 + i * 20 + 150)
          .style('opacity', 1);
      });

    // Add vertical text with animation
    svg.append('text')
      .attr('class', 'vertical-text')
      .attr('x', width - 30)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(90, ${width - 30}, ${height / 2})`)
      .attr('fill', '#333')
      .text('Sangam Biradar | kubedaily.com | cloudnativefolk')
      .style('opacity', 0)
      .transition()
      .duration(entryDuration)
      .delay(800)
      .style('opacity', 0.8);

    // Add arrow marker definition
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 7)
      .attr('markerHeight', 7)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#333');

    // Add animated connections between components with staggered delay
    const connectionsG = svg.append('g')
      .attr('class', 'connections');
      
    // Update the connection definitions to match the new landscape layout
    const connections = [
      // External connections
      { source: "developer", target: "kubectl", sourcePoint: "bottom", targetPoint: "top" },
      { source: "user", target: "ingress", sourcePoint: "bottom", targetPoint: "top" },
      { source: "cloudprovider", target: "ccm", sourcePoint: "right", targetPoint: "left" },
      
      // Main control flow
      { source: "kubectl", target: "api-server", sourcePoint: "bottom", targetPoint: "top" },
      { source: "api-server", target: "etcd", sourcePoint: "left", targetPoint: "right" },
      { source: "api-server", target: "scheduler", sourcePoint: "bottom", targetPoint: "top" },
      { source: "api-server", target: "controller-manager", sourcePoint: "bottom", targetPoint: "top" },
      
      // Controller connections
      { source: "controller-manager", target: "node-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "replication-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "endpoints-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "service-account-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "deployment-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "statefulset-controller1", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "daemonset-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "statefulset-controller2", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "job-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "cronjob-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "hpa-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "controller-manager", target: "crds-controller", sourcePoint: "right", targetPoint: "left" },
      
      // API server to webhook connections
      { source: "api-server", target: "admission-controller", sourcePoint: "right", targetPoint: "left" },
      { source: "api-server", target: "validating-webhook", sourcePoint: "right", targetPoint: "left" },
      { source: "api-server", target: "mutation-webhook", sourcePoint: "right", targetPoint: "left" },
      { source: "api-server", target: "resource-webhook", sourcePoint: "right", targetPoint: "left" },
      { source: "api-server", target: "limit-ranger", sourcePoint: "right", targetPoint: "left" },
      
      // API server to worker node connections
      { source: "api-server", target: "kubelet", sourcePoint: "right", targetPoint: "left" },
      { source: "api-server", target: "kube-proxy", sourcePoint: "right", targetPoint: "left" },
      
      // Worker node component connections
      { source: "kubelet", target: "container-runtime", sourcePoint: "top", targetPoint: "bottom" },
      { source: "kubelet", target: "pod", sourcePoint: "right", targetPoint: "left" },
      { source: "container-runtime", target: "pod", sourcePoint: "right", targetPoint: "left" },
      { source: "kube-proxy", target: "network-plugin", sourcePoint: "bottom", targetPoint: "top" },
      { source: "network-plugin", target: "volume-plugin", sourcePoint: "bottom", targetPoint: "top" },
      { source: "volume-plugin", target: "cni", sourcePoint: "bottom", targetPoint: "top" },
      
      // Pod to container connections
      { source: "pod", target: "init-container", sourcePoint: "bottom", targetPoint: "top" },
      { source: "init-container", target: "app-container", sourcePoint: "bottom", targetPoint: "top" },
      { source: "app-container", target: "sidecar-container", sourcePoint: "bottom", targetPoint: "top" },
      
      // Storage connections
      { source: "pod", target: "storage", sourcePoint: "right", targetPoint: "left" },
      { source: "storage", target: "pv", sourcePoint: "bottom", targetPoint: "top" },
      { source: "pv", target: "pvc", sourcePoint: "bottom", targetPoint: "top" },
      { source: "pvc", target: "csi", sourcePoint: "bottom", targetPoint: "top" }
    ];
    
    const allComponents = [...masterComponents, ...workerComponents, ...interfaceComponents, ...externalEntities];
    
    connections.forEach((connection, index) => {
      const sourceComponent = allComponents.find(c => c.id === connection.source);
      const targetComponent = allComponents.find(c => c.id === connection.target);
      
      if (!sourceComponent || !targetComponent) return;
      
      let sourceX, sourceY, targetX, targetY;
      
      // Determine source point
      if (connection.sourcePoint === "right") {
        sourceX = sourceComponent.x + sourceComponent.width;
        sourceY = sourceComponent.y + sourceComponent.height / 2;
      } else if (connection.sourcePoint === "bottom") {
        sourceX = sourceComponent.x + sourceComponent.width / 2;
        sourceY = sourceComponent.y + sourceComponent.height;
      } else if (connection.sourcePoint === "left") {
        sourceX = sourceComponent.x;
        sourceY = sourceComponent.y + sourceComponent.height / 2;
      } else {
        sourceX = sourceComponent.x + sourceComponent.width / 2;
        sourceY = sourceComponent.y;
      }
      
      // Determine target point
      if (connection.targetPoint === "left") {
        targetX = targetComponent.x;
        targetY = targetComponent.y + targetComponent.height / 2;
      } else if (connection.targetPoint === "top") {
        targetX = targetComponent.x + targetComponent.width / 2;
        targetY = targetComponent.y;
      } else if (connection.targetPoint === "right") {
        targetX = targetComponent.x + targetComponent.width;
        targetY = targetComponent.y + targetComponent.height / 2;
      } else {
        targetX = targetComponent.x + targetComponent.width / 2;
        targetY = targetComponent.y + targetComponent.height;
      }
      
      // Calculate the path points
      const totalLength = Math.sqrt(Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2));
      
      // Draw the connection with animated line drawing effect
      const path = connectionsG.append('path')
        .attr('class', `connection connection-${sourceComponent.id} connection-${targetComponent.id}`)
        .attr('d', `M${sourceX},${sourceY} L${targetX},${targetY}`)
        .attr('stroke', '#333')
        .attr('stroke-width', 1.5) // Bolder connection lines
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrowhead)')
        .style('stroke-dasharray', `${totalLength} ${totalLength}`)
        .style('stroke-dashoffset', totalLength)
        .style('opacity', 0);
      
      // Apply animation
      path.transition()
        .delay(1000 + index * 30)  // Staggered delay
        .duration(600)
        .style('opacity', 1)
        .style('stroke-dashoffset', 0)
        .transition()
        .duration(300)
        .style('stroke-dasharray', '4,2'); // More visible dash pattern
    });

    // Add a caption/legend with animation
    svg.append('text')
      .attr('class', 'caption')
      .attr('x', width / 2)
      .attr('y', height - 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#666')
      .text('Hover over components for more detail')
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay(1500)
      .style('opacity', 1);

  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-white dark:bg-slate-800 p-4 shadow-xl">
      <svg ref={svgRef} className="w-full h-full transition-all"></svg>
    </div>
  );
}

export default KubernetesArchitecture; 