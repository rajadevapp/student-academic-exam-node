'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentAcademicExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  studentAcademicExam.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    exam_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exam_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    exam_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER,
    },
    class_id: {
      type: DataTypes.INTEGER,
    },
    section_id: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'studentAcademicExam',
    tableName: 'tbl_student_academic_exam',
  });
  return studentAcademicExam;
};