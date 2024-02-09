pipeline {
    agent any

    environment {
        CHART_NAME = 'my-helm-chart'
        REPO_URL = 'https://github.com/your-username/your-repo.git'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint Helm Chart') {
            steps {
                sh 'helm lint ./charts/my-helm-chart'
            }
        }

        stage('Semantic Release') {
            steps {
                sh 'npm install -g semantic-release'
                sh 'semantic-release'
            }
        }

        stage('Update Chart Version') {
            steps {
                script {
                    def chartVersion = sh(returnStdout: true, script: 'semantic-release --dry-run | grep "Release version" | cut -d \':\' -f 2').trim()
                    sh "sed -i \"s/^version:.*/version: ${chartVersion}/\" ./charts/my-helm-chart/Chart.yaml"
                }
            }
        }

        stage('Package Helm Chart') {
            steps {
                sh 'helm package ./charts/my-helm-chart'
            }
        }

        stage('Create GitHub Release') {
            steps {
                script {
                    def chartVersion = sh(returnStdout: true, script: 'helm show chart ./charts/my-helm-chart | grep version | cut -d \':\' -f 2').trim()
                    def chartFile = "my-helm-chart-${chartVersion}.tgz"

                    sh "curl -X POST -H 'Content-Type: application/gzip' --data-binary @${chartFile} https://your-helm-repo.com/api/charts"
                }
            }
        }
    }
}
