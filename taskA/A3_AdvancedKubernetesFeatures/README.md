# Task A3: Advanced Kubernetes Features 
>Student Name: Ritesh Kumar

>Matriculation Number: A0201829H

>[GitHub Repository](https://github.com/rtshkmr/CS3219_assignments/tree/main/taskA3_AdvancedKubernetesFeatures)


## Deliverables


### 1. nginx ingress, sticky session

Reference for k8s nginx ingress config can be found [here](https://kubernetes.github.io/ingress-nginx/deploy/)

1. A simple html static page, along with a config file is [here](./nginx)
2. Build the image, then apply the deployment config file found in this sub-project root like so: 
   ```bash
   kubectl apply -f .\nginx-deployment.yaml # apply deployment
   ```
   we can verify via a `kubectl get pods` to see that 2 pods are up:
   ![pods verified](./resources/1_deploy_nginx.png)
3. Now, apply the service file followed by the ingress config:
   ```bash 
   kubectl apply -f .\nginx-service.yaml # apply service for internal networking
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.49.0/deploy/static/provider/cloud/deploy.yaml #controller from reference
   kubectl apply -f ./nginx-ingress.yaml # apply the ingress config
   ```
   This will allow us to locate the static page over at `localhost:32407`

4. Via the browser, the existing cookies can be seen to persist, hence are sticky despite refreshes
   ![sticky](./resources/2_sticky_session.png)





> primary resources used: [Official K8s Tutorials](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)