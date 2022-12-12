package dev.mckinney.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sun.corba.se.spi.orbutil.threadpool.NoSuchThreadPoolException;
import dev.mckinney.models.Task;
import dev.mckinney.services.TaskService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class TaskServlet extends HttpServlet {

    private TaskService taskService = new TaskService();
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        System.out.println("GET request to /tasks");
        String parameter = req.getParameter("criteria");
        ArrayList<Task> tasks = new ArrayList<>();
        switch (parameter) {
            case "all":
                tasks = taskService.getAll();
                break;
            case "completed":
                tasks = taskService.getCompleted();
                break;
            default:
                tasks = taskService.getPending();
        }

        objectMapper.registerModule(new JavaTimeModule());
        String tasksJson = objectMapper.writeValueAsString(tasks);

        try(PrintWriter pw = res.getWriter()) {
            pw.write(tasksJson);
        }

    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException{
        System.out.println("POST request to /tasks");
        try (BufferedReader reader = req.getReader();
            PrintWriter pw = res.getWriter()) {

            String taskJson = reader.readLine();
            Task task = objectMapper.readValue(taskJson, Task.class);

            if(task == null || task.getTaskName() == null || task.getTaskName().isEmpty()) {
                res.setStatus(400);
            } else {
                taskService.addNewTask(task);
                res.setStatus(201);
            }
        }
    }

    @Override
    public void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        System.out.println("DELETE request to /tasks");
        try (BufferedReader reader = req.getReader();
             PrintWriter pw = res.getWriter()) {

            String taskJson = reader.readLine();
            Task task = objectMapper.readValue(taskJson, Task.class);

            if(task == null) {
                res.setStatus(400);
            } else {
                taskService.removeTask(task.getId());
                res.setStatus(201);
            }
        }
    }

    @Override
    public void doPut(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        System.out.println("PUT request to /tasks");

        try (BufferedReader reader = req.getReader();
             PrintWriter pw = res.getWriter()) {

            String parameter = req.getParameter("action");
            String taskJson = reader.readLine();
            Task task = objectMapper.readValue(taskJson, Task.class);

            if(task == null) {
                res.setStatus(400);
            } else {
                switch (parameter) {
                    case "complete":
                        taskService.completeTask(task.getId());
                        break;
                    case "edit":
                        taskService.editTask(task);
                        break;
                }
                res.setStatus(201);
            }
        }
    }

}
