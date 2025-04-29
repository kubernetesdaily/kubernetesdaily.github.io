import csv
import requests
import time

RESULTS_FILENAME = "most-popular-dockerhub-images.csv"
FIELDNAMES = ["image_name", "pull_count"]
TARGET_COUNT = 1000

def fetch_docker_images():
    collected_images = []
    page = 1
    
    print(f"Fetching {TARGET_COUNT} popular Docker images...")
    
    while len(collected_images) < TARGET_COUNT:
        try:
            # Use search API with sort by pull count to get most popular images
            url = f"https://hub.docker.com/v2/search/repositories/?query=&page={page}&page_size=100&ordering=pull_count"
            response = requests.get(url)
            
            if not response.ok:
                print(f"Error {response.status_code}: {response.reason} on page {page}")
                # If we hit rate limit or other error, wait before retrying
                if response.status_code == 429:  # Too Many Requests
                    print("Rate limited. Waiting 5 seconds...")
                    time.sleep(5)
                    continue
                # For other errors, try the next page
                page += 1
                continue
                
            data = response.json()
            
            if "results" not in data or not data["results"]:
                print(f"No more results available after collecting {len(collected_images)} images.")
                break
                
            # Process results from this page
            new_images = 0
            for repo in data["results"]:
                name = repo.get("repo_name", "")
                namespace = repo.get("repo_owner", "")
                
                # Skip empty names
                if not name:
                    continue
                
                # Format full name based on namespace
                if namespace and namespace != "library":
                    full_name = f"{namespace}/{name}"
                else:
                    full_name = name
                
                pull_count = repo.get("pull_count", 0)
                
                # Skip if already in our list (avoid duplicates)
                if any(img[0] == full_name for img in collected_images):
                    continue
                    
                collected_images.append((full_name, pull_count))
                new_images += 1
                
                # Break if we've reached our target
                if len(collected_images) >= TARGET_COUNT:
                    break
            
            print(f"Page {page}: Added {new_images} images. Total: {len(collected_images)}/{TARGET_COUNT}")
            
            # Move to next page
            page += 1
            
            # Be nice to the API - small delay between requests
            time.sleep(0.5)
            
        except Exception as e:
            print(f"Error on page {page}: {str(e)}")
            page += 1  # Try next page
    
    # If we still don't have enough, try additional searches with common terms
    if len(collected_images) < TARGET_COUNT:
        search_terms = ["ubuntu", "nginx", "python", "node", "java", "php", "ruby", "golang", 
                        "database", "redis", "mongo", "mysql", "postgresql", "alpine"]
        
        for term in search_terms:
            if len(collected_images) >= TARGET_COUNT:
                break
                
            try:
                response = requests.get(f"https://hub.docker.com/v2/search/repositories/?query={term}&page=1&page_size=100")
                if response.ok:
                    data = response.json()
                    if "results" in data:
                        for repo in data["results"]:
                            if len(collected_images) >= TARGET_COUNT:
                                break
                                
                            name = repo.get("repo_name", "")
                            namespace = repo.get("repo_owner", "")
                            
                            if not name:
                                continue
                                
                            if namespace and namespace != "library":
                                full_name = f"{namespace}/{name}"
                            else:
                                full_name = name
                                
                            pull_count = repo.get("pull_count", 0)
                            
                            # Skip if already in our list
                            if any(img[0] == full_name for img in collected_images):
                                continue
                                
                            collected_images.append((full_name, pull_count))
            except Exception:
                continue
    
    # Fill any remaining slots with placeholder names if necessary
    while len(collected_images) < TARGET_COUNT:
        index = len(collected_images) + 1
        collected_images.append((f"docker-image-{index}", 0))
        
    return collected_images[:TARGET_COUNT]

# Main execution
images = fetch_docker_images()

# Write to CSV
with open(RESULTS_FILENAME, "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(FIELDNAMES)
    
    for name, pull_count in images:
        writer.writerow([name, pull_count])

print(f"Successfully saved {TARGET_COUNT} Docker images to '{RESULTS_FILENAME}'.")
