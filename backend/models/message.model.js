module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })
    return Message
}