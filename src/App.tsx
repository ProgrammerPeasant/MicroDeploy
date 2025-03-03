import React from 'react';
import { Github, GitMerge, Box, BarChart, Server, Workflow } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Workflow className="h-8 w-8" />
              <h1 className="text-2xl font-bold">MicroDeploy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a href="#documentation" className="hover:text-blue-200 transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Microservices Deployment Automation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive solution for automating the deployment of microservices using GitLab CI/CD, 
            Docker, Kubernetes with integrated monitoring via Prometheus and Grafana.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <GitMerge className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">CI/CD Pipeline</h3>
            </div>
            <p className="text-gray-600">
              Automated build, test, and deployment workflows using GitLab CI/CD to ensure 
              consistent and reliable delivery of microservices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Box className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Containerization</h3>
            </div>
            <p className="text-gray-600">
              Docker-based containerization for consistent environments across development, 
              testing, and production deployments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Server className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Kubernetes Orchestration</h3>
            </div>
            <p className="text-gray-600">
              Scalable and resilient infrastructure with Kubernetes for managing containerized 
              microservices with automated scaling and self-healing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Monitoring & Alerting</h3>
            </div>
            <p className="text-gray-600">
              Comprehensive monitoring with Prometheus and visualization with Grafana dashboards 
              for real-time insights into system performance.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Architecture Overview</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <div className="min-w-[800px] h-[400px] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Architecture Diagram" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="documentation" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Project Documentation</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-2xl font-semibold mb-4">GitLab CI/CD Configuration</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code className="text-sm">
{`# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy
  - monitor

variables:
  DOCKER_REGISTRY: registry.example.com
  KUBERNETES_NAMESPACE: microservices

build:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    - docker build -t $DOCKER_REGISTRY/microservice:$CI_COMMIT_SHA .
    - docker push $DOCKER_REGISTRY/microservice:$CI_COMMIT_SHA

test:
  stage: test
  image: node:16-alpine
  script:
    - npm install
    - npm test

deploy:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl set image deployment/microservice microservice=$DOCKER_REGISTRY/microservice:$CI_COMMIT_SHA
    - kubectl rollout status deployment/microservice

monitor:
  stage: monitor
  script:
    - curl -X POST http://prometheus-pushgateway:9091/metrics/job/microservice/instance/$CI_COMMIT_SHA
      --data-binary "deployment_success{service=\"microservice\",version=\"$CI_COMMIT_SHA\"} 1"
`}
              </code>
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-2xl font-semibold mb-4">Dockerfile Example</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code className="text-sm">
{`# Dockerfile
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["npm", "start"]
`}
              </code>
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-2xl font-semibold mb-4">Kubernetes Deployment</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code className="text-sm">
{`# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: microservice
  namespace: microservices
spec:
  replicas: 3
  selector:
    matchLabels:
      app: microservice
  template:
    metadata:
      labels:
        app: microservice
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3000"
        prometheus.io/path: "/metrics"
    spec:
      containers:
      - name: microservice
        image: registry.example.com/microservice:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
`}
              </code>
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Prometheus Configuration</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code className="text-sm">
{`# prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\\d+)?;(\\d+)
        replacement: $1:$2
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: kubernetes_pod_name
`}
              </code>
            </pre>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Implementation Steps</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1. Set Up GitLab CI/CD Pipeline</h3>
              <p className="text-gray-600 mb-4">
                Configure your GitLab repository with a CI/CD pipeline that automates the build, test, and deployment process.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Create a <code>.gitlab-ci.yml</code> file in your repository root</li>
                <li>Define stages for build, test, deploy, and monitoring</li>
                <li>Configure Docker image building and pushing to a registry</li>
                <li>Set up automated testing for your microservices</li>
                <li>Implement deployment to Kubernetes</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">2. Containerize Your Microservices</h3>
              <p className="text-gray-600 mb-4">
                Create Docker containers for each microservice to ensure consistent environments.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Create a Dockerfile for each microservice</li>
                <li>Implement multi-stage builds to minimize image size</li>
                <li>Include health check endpoints</li>
                <li>Configure proper resource limits</li>
                <li>Implement logging to stdout/stderr</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">3. Set Up Kubernetes Infrastructure</h3>
              <p className="text-gray-600 mb-4">
                Configure Kubernetes to orchestrate your containerized microservices.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Create namespace for your microservices</li>
                <li>Define deployments, services, and ingress resources</li>
                <li>Configure resource requests and limits</li>
                <li>Implement health checks and readiness probes</li>
                <li>Set up horizontal pod autoscaling</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">4. Implement Monitoring with Prometheus and Grafana</h3>
              <p className="text-gray-600 mb-4">
                Set up comprehensive monitoring for your microservices infrastructure.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Deploy Prometheus using Helm chart</li>
                <li>Configure service discovery for Kubernetes pods</li>
                <li>Implement custom metrics in your microservices</li>
                <li>Set up Grafana dashboards for visualization</li>
                <li>Configure alerting rules and notification channels</li>
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Workflow className="h-6 w-6" />
              <span className="text-xl font-bold">MicroDeploy</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-gray-400">
            <p>© 2025 MicroDeploy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;