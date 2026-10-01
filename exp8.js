app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return res.status(404).send({
      message: "Student not found"
    });
  }

  students = students.filter(s => s.id !== id);
  res.send({
    message: "Student deleted successfully",
    students: students
  });
});

// Start Server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});