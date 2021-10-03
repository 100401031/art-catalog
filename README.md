# art-catalog

### Step1. Build docker image

```
docker build -t art-catalog .
```

### Step2. Run the app in the container listening port 8080

```
docker run -it -p 8080:8080 --rm --name art-catalog-app art-catalog
```
