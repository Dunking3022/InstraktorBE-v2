const Attendance = require("../Models/Attendance");
const User = require("../Models/User");

exports.addAttendance = async (req, res) => {
  try {
    const { subject, studentRecords, date } = req.body;

    // Validate the request body
    if (
      !subject ||
      !studentRecords ||
      !Array.isArray(studentRecords) ||
      !date
    ) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Parse the date string (assuming it is in DD-MM-YYYY format)
    const [day, month, year] = date.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    // Create attendance records for the specified subject
    const createdAttendanceRecords = await Promise.all(
      studentRecords.map(async ({ studentId, status }) => {
        return Attendance.create({
          student: studentId,
          subject: subject,
          date: parsedDate,
          status: status,
        });
      })
    );

    // Filter out null values (records for non-existent users)
    const validAttendanceRecords = createdAttendanceRecords.filter(
      (record) => record !== null
    );

    return res.status(201).json({
      message: "Attendance records added successfully",
      subject: subject,
      attendanceRecords: validAttendanceRecords,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Validate the studentId
    if (!studentId) {
      return res.status(400).json({ error: "Invalid studentId" });
    }

    // Find the attendance records for the specified student
    const studentAttendanceRecords = await Attendance.find({
      student: studentId,
    });

    // Group attendance records by subject
    const attendanceBySubject = {};
    studentAttendanceRecords.forEach((record) => {
      const { subject } = record;
      if (!attendanceBySubject[subject]) {
        attendanceBySubject[subject] = [];
      }
      attendanceBySubject[subject].push(record);
    });

    // Convert attendanceBySubject to an array
    const attendanceArray = Object.entries(attendanceBySubject).map(
      ([subject, records]) => {
        const totalRecords = records.length;
        const presentDays = records.filter(
          (record) => record.status === "PRESENT"
        ).length;
        const attendancePercentage =
          totalRecords === 0 ? 0 : (presentDays / totalRecords) * 100;

        return {
          subject: subject,
          attendancePercentage: attendancePercentage,
          attendanceRecords: records,
        };
      }
    );

    return res.status(200).json({
      studentId: studentId,
      attendanceBySubject: attendanceArray,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getStudentsByGroup = async (req, res) => {
  try {
    const { group } = req.params;

    // Validate the group parameter
    if (!group) {
      return res.status(400).json({ error: "Invalid group parameter" });
    }

    // Find all students in the specified group
    const students = await User.find({ group: group }).select("-password");

    return res.status(200).json({
      message: "Students retrieved successfully",
      group: group,
      students: students,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
