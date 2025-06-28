'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentAcademicExamMarkDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  studentAcademicExamMarkDetails.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    academic_exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    academic_exam_student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_mark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mark_scored: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'studentAcademicExamMarkDetails',
    tableName: 'tbl_student_academic_exam_mark_details',
  });
  return studentAcademicExamMarkDetails;
};