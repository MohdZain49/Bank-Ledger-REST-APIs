const app = require("./src/app");
const ENV = require("./src/lib/env");

const { PORT } = ENV;
app.listen(PORT, () => console.log(`Server start listening on port ${PORT}`));
