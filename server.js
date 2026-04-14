const app = require("./src/app");
const ENV = require("./src/lib/env");
const connectDataBase = require("./src/lib/db");

const PORT = ENV.PORT || 3001;

connectDataBase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server start listening on port ${PORT}`),
    );
  })
  .catch((err) => {
    console.error("Failed to run server!!\n", err);
    process.exit(1);
  });
