module.exports = {
  apps: [
    {
      name: "FurniShop-REACT",
      script: "npx",
      args: "serve -s build -l 3000",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
