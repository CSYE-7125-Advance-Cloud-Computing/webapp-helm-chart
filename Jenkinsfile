pipeline {
    agent any

    environment {
        CHART_NAME = 'webapp-helm-chart'
        REPO_URL = 'https://github.com/CSYE-7125-Advance-Cloud-Computing/webapp-helm-chart'
        GITHUB_TOKEN = 'GITHUB_TOKEN'
    }

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint Helm Chart') {
            steps {
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
                    sh "sed -i \"s/^version:.*/version: ${chartVersion}/\" Chart.yaml"
                }
            }
        }

        

        stage('Create GitHub Release') {
            steps {
                script {
                    def chartVersion = sh(returnStdout: true, script: 'helm show chart . | grep version | cut -d \':\' -f 2').trim()
                    def chartFile = "${CHART_NAME}-${chartVersion}.tgz"
                    sh 'jenkins-plugin-cli --plugins github-release:10.vc8cd6962b_e7f'
                    sh "github-release upload --owner MahithChigurupati --repo https://github.com/CSYE-7125-Advance-Cloud-Computing/webapp-helm-chart --tag v${chartVersion} --name \"Release v${chartVersion}\" --file ${chartFile}"
                }
            }
        }
    }
}

