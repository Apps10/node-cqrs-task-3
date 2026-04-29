import { DataTypes, Model, Sequelize } from "sequelize";

export class TaskModel extends Model {}

export const initTaskModel = (sequeliceClient: Sequelize)=>{
  TaskModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      title: {
       type: DataTypes.STRING,
        allowNull: false
      },
      description: {
       type: DataTypes.STRING,
        allowNull: false
      },
      completed: {
       type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize: sequeliceClient,
      tableName: "Task"
    }
  )
  TaskModel.sync({
  })
}
