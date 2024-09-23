pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = '008971675228.dkr.ecr.us-east-1.amazonaws.com/profile'
        AWS_CREDENTIALS_ID = 'aws-creds'
    }

    stages {
        stage("Clean Workspace") {
            steps {
                deleteDir()
            }
        }

        stage("Clone Github Repository") {
            steps {
                git branch: 'master', credentialsId: "github-creds", url: 'https://github.com/himanshu-mamgain/profile-assignment-backend.git'
            }
        }

        stage("Checkout Repo") {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[credentialsId: 'github-creds', url: 'https://github.com/himanshu-mamgain/profile-assignment-backend.git']]
                )
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    sh "docker build --no-cache -t profile ."
                    echo "$JOB_NAME:v1.$BUILD_ID"
                    sh "docker tag profile:latest ${ECR_REPO}:latest"
                }
            }
        }

        stage("Push Image to ECR") {
            steps {
                script {
                    // Using AWS credentials for ECR login and push
                    withAWS(credentials: "${AWS_CREDENTIALS_ID}", region: "${AWS_REGION}") {
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}"
                        sh "docker push ${ECR_REPO}:latest"
                        sh "docker rmi ${ECR_REPO}:latest"
                        sh "docker system prune -af"
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
