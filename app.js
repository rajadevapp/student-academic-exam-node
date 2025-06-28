const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();
const { QueryTypes} = require('sequelize');
const Sequelize = db.sequelize;
const Student = db.Student;
const studentAcademicExam = db.studentAcademicExam;
const studentAcademicExamStudentDetails = db.studentAcademicExamStudentDetails;
const studentAcademicExamMarkDetails = db.studentAcademicExamMarkDetails;

require('dotenv').config();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.get('/api/v1/student',async (req,res)=>{
    // var data = await Student.findAll({
    //     where:{
    //         is_active: 1
    //     }
    // });

    const results = await Sequelize.query(
        `SELECT s.id,s.first_name,s.last_name,
        s.email,s.mobile_number,s.is_active,
        s.created_by,s.updated_by,
        c.class_name, sec.section_name
        FROM tbl_student AS s
        LEFT JOIN tbl_class as c on c.id = s.class_id and c.is_active = 1
        LEFT JOIN tbl_section as sec on sec.id = s.section_id and sec.is_active =1 
        WHERE s.is_active = 1`,
        {
        type: QueryTypes.SELECT,
        raw: true
        }
    );
    
    res.send({
        'success':true,
        'total':results.length,
        'data' : results
    });
});

var getData = (model, id) => {
    var data =  model.findOne({
        where:{
            id:id,
            is_active: 1
        }
    });

    return data;
}
app.get('/api/v1/student/view/:id',async (req,res)=>{
    var id = req.params.id;

    var data = await getData(Student,id);

    if(data){
        res.send({
            'success':true,
            'data' : data
        });
    }else{
        res.send({
            'success':false,
            'message':"Data not found"
        });
    }
});

app.post('/student/save', async(req,res)=>{

    var student = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        address : req.body.address,
        mobile_number : req.body.mobile_number,
        class_id : req.body.class_id,
        section_id : req.body.section_id,
        is_active : 1,
        created_by:1,
        updated_by:1
    }

    var studentSave = await Student.create(student);//inserrt into 

    // console.log(studentSave.id);
    res.send({
        'success':true,
        'message': "Student added successfully"
    });
});

app.post('/student/update/:id', async(req,res)=>{

    var id = req.params.id;
    var student = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        address : req.body.address,
        mobile_number : req.body.mobile_number,
        class_id : req.body.class_id,
        section_id : req.body.section_id,
        updated_by:1
    }

    var studentUpdate = await Student.update(
        student,
        {
            where:{
                id: id
            }
        }
        
    );

    res.send({
        'success':true,
        'message': "Student updated successfully"
    });
});

app.delete('/student/delete/:id', async(req,res)=>{

    var id = req.params.id;
    var student = {
        is_active : 0,
        updated_by:1
    }

    var studentDelete = await Student.update(
        student,
        {
            where:{
                id: id
            }
        }
    );

    res.send({
        'success':true,
        'message': "Student deleted successfully"
    });
});

app.get('/api/v1/class',async (req,res)=>{
    const results = await Sequelize.query(
        `SELECT c.id,c.class_name, c.class_code,
        c.is_active,c.created_by,c.updated_by
        FROM tbl_class AS c
        WHERE c.is_active = 1`,
        {
        type: QueryTypes.SELECT,
        raw: true
        }
    );
    
    res.send({
        'success':true,
        'total':results.length,
        'data' : results
    });
});

app.get('/api/v1/subject',async (req,res)=>{
    const results = await Sequelize.query(
        `SELECT c.id,c.subject_name, c.subject_code,
        c.is_active,c.created_by,c.updated_by
        FROM tbl_subject AS c
        WHERE c.is_active = 1`,
        {
        type: QueryTypes.SELECT,
        raw: true
        }
    );
    
    res.send({
        'success':true,
        'total':results.length,
        'data' : results
    });
});

app.get('/api/v1/section',async (req,res)=>{
    const results = await Sequelize.query(
        `SELECT c.id,c.section_name, c.section_code,
        c.is_active,c.created_by,c.updated_by
        FROM tbl_section AS c
        WHERE c.is_active = 1`,
        {
        type: QueryTypes.SELECT,
        raw: true
        }
    );
    
    res.send({
        'success':true,
        'total':results.length,
        'data' : results
    });
});

app.get('/api/v1/student/academic-exam',async (req,res)=>{

    let limit = req.query.limit ? req.query.limit : 10;
    let search = req.query.search;
    var sql='';

    if(search){
        sql += `and s.exam_name like '%${search}%'`;
    }
    const results = await Sequelize.query(
        `SELECT s.id,s.exam_name,s.exam_start_date,
        s.exam_end_date,s.is_active,
        s.created_by,s.updated_by,
        c.class_name, sec.section_name
        FROM tbl_student_academic_exam AS s
        LEFT JOIN tbl_class as c on c.id = s.class_id and c.is_active = 1
        LEFT JOIN tbl_section as sec on sec.id = s.section_id and sec.is_active =1 
        WHERE s.is_active = 1 ${sql} limit :limit`,
        {
        type: QueryTypes.SELECT,
        replacements:{limit: Number(limit)},
        raw: true
        }
    );
    
    res.send({
        'success':true,
        'total':results.length,
        'data' : results
    });
});



app.get('/api/v1/student/academic-exam/view/:id',async (req,res)=>{
    var id = req.params.id;

    const data = await Sequelize.query(
        `SELECT s.id,s.exam_name,s.exam_start_date,
        s.class_id,s.section_id,
        s.exam_end_date,s.is_active,
        s.created_by,s.updated_by,
        c.class_name, sec.section_name
        FROM tbl_student_academic_exam AS s
        LEFT JOIN tbl_class as c on c.id = s.class_id and c.is_active = 1
        LEFT JOIN tbl_section as sec on sec.id = s.section_id and sec.is_active =1 
        WHERE s.is_active = 1 and s.id=:id`,
        {
        type: QueryTypes.SELECT,
        replacements:{id:id},
        raw: true
        }
    );

    const studentResult = await Sequelize.query(
        `SELECT s.id,s.academic_exam_id,s.student_id,
        s.total_mark,s.total_mark_scored,s.status,
        s.is_active,stu.first_name,stu.last_name,
        c.class_name, sec.section_name
        FROM tbl_student_academic_exam_student_details AS s
        LEFT JOIN tbl_student as stu on stu.id = s.student_id
        LEFT JOIN tbl_class as c on c.id = stu.class_id and c.is_active = 1
        LEFT JOIN tbl_section as sec on sec.id = stu.section_id and sec.is_active =1 
        WHERE s.is_active = 1 and s.academic_exam_id=:academic_exam_id`,
        {
        type: QueryTypes.SELECT,
        replacements:{academic_exam_id:id},
        raw: true
        }
    );
    var response = data[0];

    for (const element of studentResult) {
        const studentMarkResult = await Sequelize.query(
            `SELECT s.id,s.academic_exam_id,s.academic_exam_student_id,
            s.subject_id,s.total_mark,s.mark_scored,s.comments,
            s.is_active,sub.subject_name
            FROM tbl_student_academic_exam_mark_details AS s
            LEFT JOIN tbl_subject as sub on sub.id = s.subject_id and sub.is_active = 1
            WHERE s.is_active = 1 and s.academic_exam_id=:academic_exam_id and s.academic_exam_student_id=:academic_exam_student_id`,
            {
            type: QueryTypes.SELECT,
            replacements:{academic_exam_id:id,academic_exam_student_id:element.id},
            raw: true
            }
        );
        element.mark_details = studentMarkResult;
    }
    response.student_detail = await studentResult;

    const subjectList = await Sequelize.query(
        `SELECT s.id,s.subject_id,s.total_mark,
        s.is_active,sub.subject_name
        FROM tbl_student_academic_exam_mark_details AS s
        LEFT JOIN tbl_subject as sub on sub.id = s.subject_id and sub.is_active = 1
        WHERE s.is_active = 1 and s.academic_exam_id=:academic_exam_id group by s.subject_id`,
        {
        type: QueryTypes.SELECT,
        replacements:{academic_exam_id:id},
        raw: true
        }
    );
    response.subject_list = subjectList;
    res.send({
        'success':true,
        'data' : response
    });
});


app.get('/api/v1/student/academic-exam/getStudent',async (req,res)=>{

    let class_id = req.query.class_id;
    let section_id = req.query.section_id;
    let academic_exam_id = req.query.academic_exam_id ? req.query.academic_exam_id : 0;
    const results = await Sequelize.query(
        `SELECT s.id,s.first_name,s.last_name,
        s.email,s.mobile_number,s.is_active,
        coalesce (asd.academic_exam_id,0) as academic_exam_id,coalesce (asd.total_mark,0) as total_mark,coalesce (asd.total_mark_scored,0) as total_mark_scored,
        coalesce (asd.status,'pass/fail') as status,s.created_by,s.updated_by,
        c.class_name, sec.section_name
        FROM tbl_student AS s
        LEFT JOIN tbl_class as c on c.id = s.class_id and c.is_active = 1
        LEFT JOIN tbl_section as sec on sec.id = s.section_id and sec.is_active =1 
        LEFT JOIN tbl_student_academic_exam_student_details as asd on asd.student_id = s.id and academic_exam_id=:academic_exam_id
        WHERE s.is_active = 1 and s.class_id=:class_id and s.section_id=:section_id`,
        {
        type: QueryTypes.SELECT,
        replacements:{academic_exam_id:academic_exam_id,class_id:class_id, section_id:section_id},
        raw: true
        }
    );
    
    res.send({
        'success':true,
        'total':results.length,
        'data' : results
    });
});

app.post('/api/v1/student/academic-exam/save', async(req,res)=>{

    var student = {
        exam_name : req.body.exam_name,
        exam_start_date : req.body.exam_start_date,
        exam_end_date : req.body.exam_end_date,
        class_id : req.body.class_id,
        section_id : req.body.section_id,
        is_active : 1,
        created_by:1,
        updated_by:1
    }

    var student_academic_exam = req.body.exam;
    // student academic exam save 
    var studentSave = await studentAcademicExam.create(student);
    
    // student academic exam student save 
    for(element of student_academic_exam){
        element.academic_exam_id = studentSave.id;
        element.class_id = studentSave.class_id;
        element.section_id = studentSave.section_id;
        element.is_active = 1;
        element.created_by = 1;
        element.updated_by = 1;

        var studentAcademicExamStudentDetailsSave = await studentAcademicExamStudentDetails.create(element);

        //student academic exam mark and subject details 
        var subject_mark = element.subject_mark;
        for(value of subject_mark){
            value.academic_exam_id = studentSave.id;
            value.academic_exam_student_id = studentAcademicExamStudentDetailsSave.id;
            value.is_active = 1;
            value.created_by = 1;
            value.updated_by = 1;
            const studentAcademicExamMarkDetailsSave = await studentAcademicExamMarkDetails.create(value);
        }
    }

    // console.log(studentSave.id);
    res.send({
        'success':true,
        'message': "Student academic exam added successfully"
    });
});

app.post('/api/v1/student/academic-exam/update/:id', async(req,res)=>{

    var id = req.params.id;

    var student = {
        exam_name : req.body.exam_name,
        exam_start_date : req.body.exam_start_date,
        exam_end_date : req.body.exam_end_date,
        class_id : req.body.class_id,
        section_id : req.body.section_id,
        updated_by:1
    }

    var studentUpdate = await studentAcademicExam.update(student,{
        where:{
            id: id
        }
    });

    var student_academic_exam = req.body.exam;
    var data;
    if(studentUpdate > 0){
        data = await getData(studentAcademicExam,id);
        await studentAcademicExamStudentDetails.destroy({
            where: {
                academic_exam_id: data.id
            }
        });
        await studentAcademicExamMarkDetails.destroy({
            where: {
                academic_exam_id: data.id
            }
        });
    }
    // student academic exam student save 
    for(element of student_academic_exam){
        element.academic_exam_id = data.id;
        element.class_id = data.class_id;
        element.section_id = data.section_id;
        element.is_active = 1;
        element.created_by = 1;
        element.updated_by = 1;

        var studentAcademicExamStudentDetailsSave = await studentAcademicExamStudentDetails.create(element);
 
        var studentData = await studentAcademicExamStudentDetails.findOne({
            where:{
                academic_exam_id:data.id,
                is_active: 1
            },
            order: [
                ['id', 'DESC']
            ]
        });
        //student academic exam mark and subject details
        var subject_mark = element.subject_mark;
        for(value of subject_mark){
            value.academic_exam_id = data.id;
            value.academic_exam_student_id = studentAcademicExamStudentDetailsSave.id;
            value.is_active = 1;
            value.created_by = 1;
            value.updated_by = 1;
            const studentAcademicExamMarkDetailsSave = await studentAcademicExamMarkDetails.create(value);
        }
    }
    res.send({
        'success':true,
        'message': "Student academic exam updated successfully"
    });
});


app.delete('/api/v1/student/academic-exam/delete/:id', async(req,res)=>{

    var id = req.params.id;
    var student = {
        is_active : 0,
        updated_by:1
    }

    var studentDelete = await studentAcademicExam.update(
        student,
        {
            where:{
                id: id
            }
        }
    );
    var studentDetailsDelete = await studentAcademicExamStudentDetails.update(
        student,
        {
            where:{
                academic_exam_id: id
            }
        }
    );
    var studentMarkDetailsDelete = await studentAcademicExamMarkDetails.update(
        student,
        {
            where:{
                academic_exam_id: id
            }
        }
    );

    res.send({
        'success':true,
        'message': "Student deleted successfully"
    });
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Your project runing in this port ${port}`);
})