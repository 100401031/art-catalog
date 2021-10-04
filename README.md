# Skill Test - Art Catalog

## Setup the app

### Step1. Build docker image

```
docker build -t art-catalog .
```

### Step2. Run the app in the container listening port 8080

```
docker run -it -p 8080:8080 --rm --name art-catalog-app art-catalog
```

## Problems during skill test

### 1. The ARTIC API won’t allow request with more than 1,000 records. 
Server will return 403. So the available total number of records will not match with API response. The paginator will be not valid for user if the page beyond the limitation.

**Solution:** The total number of records will be regarded as 1,000 if it is greater than 1,000. So the paginator will always show the available pages.

