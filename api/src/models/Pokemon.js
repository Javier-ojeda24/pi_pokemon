const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	// defino el modelo
	sequelize.define(
		"pokemon",
		{
			name: {
				type: DataTypes.STRING,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				unique: true,
			},
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
			hp: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			attack: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			defense: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			speed: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			height: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			weight: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			img: {
				type: DataTypes.STRING,
			},
			createdInBd: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			createdAt: false,
			updatedAt: false,
		}
	);
};
