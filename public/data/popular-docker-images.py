import requests
import csv

def get_popular_docker_images(limit=1000):
    images = []
    page = 1
    while len(images) < limit:
        url = f"https://hub.docker.com/v2/repositories/library/?page={page}&page_size=10000"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            results = data.get('results', [])
            images.extend([(image['name'], image['pull_count']) for image in results])
            if len(results) < 100:  # No more images to fetch
                break
            page += 1
        else:
            print(f"Failed to retrieve images: {response.status_code}")
            break

    return images[:limit]

def save_images_to_csv(images, filename='popular_docker_images.csv'):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Image Name', 'Pull Count'])  # Header
        writer.writerows(images)

if __name__ == "__main__":
    popular_images = get_popular_docker_images()
    save_images_to_csv(popular_images)
    print(f"Saved {len(popular_images)} popular Docker images to 'popular_docker_images.csv'.")
