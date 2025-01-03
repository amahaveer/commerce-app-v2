export const getServiceBaseUrls = (): { [key: string]: string } => {
    const urls = process.env.SERVICE_BASE_URLS;
    if (!urls) {
      throw new Error("SERVICE_BASE_URLS is not defined in the environment variables.");
    }
  
    return urls.split(',').reduce((acc: { [key: string]: string }, item) => {
      const [path, url] = item.split('=');
      if (path && url) {
        acc[path.trim()] = url.trim();
      }
      return acc;
    }, {});
  };
  