pipeline {
    agent any

    environment {
        CHART_NAME = 'my-helm-chart'
        REPO_URL = 'https://github.com/CSYE-7125-Advance-Cloud-Computing/webapp-helm-chart'
        GITHUB_TOKEN = 'GITHUB_TOKEN'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint Helm Chart') {
            steps {
                sh "curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null"
                sh "sudo apt-get install apt-transport-https --yes"
                sh "echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list"
                sh "sudo apt-get update"
                sh "sudo apt-get install helm"
                sh 'helm lint .'
            }
        }

        stage('Package Helm Chart') {
            steps {
                
                sh 'helm package .'
            }
        }

        stage('Semantic Release') {
            steps {
                script {
                    sh 'npm install -g semantic-release'
                    sh 'semantic-release'
                }
            }
        }

        stage('Update Chart Version') {
            steps {
                script {
                    def chartVersion = sh(returnStdout: true, script: 'semantic-release --dry-run | grep "Release version" | cut -d \':\' -f 2').trim()
                    sh "sed -i \"s/^version:.*/version: ${chartVersion}/\" ./charts/${CHART_NAME}/Chart.yaml"
                }
            }
        }

        

        stage('Create GitHub Release') {
            steps {
                script {
                    def chartVersion = sh(returnStdout: true, script: 'helm show chart ./charts/${CHART_NAME} | grep version | cut -d \':\' -f 2').trim()
                    def chartFile = "${CHART_NAME}-${chartVersion}.tgz"
                    sh "github-release upload --owner MahithChigurupati --repo https://github.com/CSYE-7125-Advance-Cloud-Computing/webapp-helm-chart --tag v${chartVersion} --name \"Release v${chartVersion}\" --file ${chartFile}"
                }
            }
        }
    }
}

