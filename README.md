# Web Application Helm Chart

This repository contains Helm charts for deploying our web application.

## Prerequisites

- [Helm](https://helm.sh/) must be installed on your Kubernetes cluster.
- Access to the Kubernetes cluster where you intend to deploy the application.

## Usage

1. Add the Helm chart repository:

   ```bash
   helm repo add my-charts https://github.com/your-organization/webapp-helm-chart
   helm repo update

   helm install my-webapp my-charts/webapp-helm-chart
   minikube service my-webapp
   helm install my-webapp my-charts/webapp-helm-chart --set replicaCount=3
   helm uninstall my-webapp

   ```