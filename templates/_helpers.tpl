{{/* Define a template to get the release name */}}
{{- define "webapp-helm-chart.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}
