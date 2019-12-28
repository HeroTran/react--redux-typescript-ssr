require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./src/client/routeSitemap.tsx").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("http://localhost:3001/")
            .save("dist/sitemap.xml")
      );
  }
  
  generateSitemap();