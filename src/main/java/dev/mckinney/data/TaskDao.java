package dev.mckinney.data;

import dev.mckinney.models.Task;

import java.util.ArrayList;

public interface TaskDao {

    public ArrayList<Task> getAllTasks();

    public ArrayList<Task> getPendingTasks();

    public ArrayList<Task> getCompletedTasks();

    public int addTask(Task newTask);

    public int completeTaskById(int id);

    public Task getTaskById(int id);

    public int removeTask(int id);

}
