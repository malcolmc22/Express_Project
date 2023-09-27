const { squelize, sequelize } = require('./db/models');

squelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
        await sequelize.createSchema(process.env.SCHEMA);
    }
});
