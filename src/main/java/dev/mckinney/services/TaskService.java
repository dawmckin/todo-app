package dev.mckinney.services;

import dev.mckinney.data.TaskDao;
import dev.mckinney.data.TaskDaoImpl;
import dev.mckinney.models.Task;

import java.util.ArrayList;

public class TaskService {
    private TaskDao taskData;

    public TaskService() {
        super();
        this.taskData = new TaskDaoImpl();
    }

    public TaskService(TaskDao taskDao) {
        super();
        this.taskData = taskDao;
    }

    public ArrayList<Task> getAll() {
        return taskData.getAllTasks();
    }

    public ArrayList<Task> getPending() {
        return taskData.getPendingTasks();
    }

    public ArrayList<Task> getCompleted() {
        return taskData.getCompletedTasks();
    }

    public Task getTask(int id) {
        return taskData.getTaskById(id);
    }

    public void addNewTask(String name) {
        Task t = new Task(name);
        taskData.addTask(t);
    }

    public void addNewTask(Task t) {
        taskData.addTask(t);
    }

    public void completeTask(int id) {
        taskData.completeTaskById(id);
    }

    public int removeTask(int id) {
        return taskData.removeTask(id);
    }

    public int editTask(Task task) {
        return taskData.updateTask(task);
    }

}
