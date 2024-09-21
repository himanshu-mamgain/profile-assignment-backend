pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = '008971675228.dkr.ecr.us-east-1.amazonaws.com/profile'
        AWS_CREDENTIALS_ID = 'aws-credentials'
    }

    stages {
        stage("Clean Workspace") {
            steps {
                deleteDir()
            }
        }

        stage("Clone Github Repository") {
            steps {
                git branch: 'master', credentialsId: "global", url: 'https://github.com/himanshu-mamgain/profile-assignment-backend.git'
                sh 'sudo chmod -R 777 /var/lib/jenkins/workspace/*'
            }
        }

        stage("Checkout Repo") {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[credentialsId: 'global', url: 'https://github.com/himanshu-mamgain/profile-assignment-backend.git']]
                )
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    sh "sudo docker build --no-cache -t profile ."
                    echo "$JOB_NAME:v1.$BUILD_ID"
                    sh "sudo docker tag profile:latest 008971675228.dkr.ecr.us-east-1.amazonaws.com/profile:latest"
                }
            }
        }

        stage("Push Image to ECR") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${AWS_CREDENTIALS_ID}", passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                        sh "sudo aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 008971675228.dkr.ecr.us-east-1.amazonaws.com"
                        sh "sudo docker push 008971675228.dkr.ecr.us-east-1.amazonaws.com/profile:latest"
                        sh "sudo docker rmi profile:latest"
                        sh "sudo docker system prune -af"
                    }
                }
            }
        }

        stage("Deployment") {
            steps {
                script {
                    // Add ECS deployment script here
                    echo "Deploying to ECS..."
                }
            }
        }
    }
}