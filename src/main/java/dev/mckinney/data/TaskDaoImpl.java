package dev.mckinney.data;

import dev.mckinney.models.Task;
import dev.mckinney.services.ConnectionService;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;

public class TaskDaoImpl implements TaskDao{

    ConnectionService connectionService = new ConnectionService();

    private ArrayList<Task> getSubsetOfTasks(String criteria) {
        String sql = "";
        switch (criteria) {
            case "all":
                sql = "select * from task order by task_id";
                break;
            case "pending":
                sql = "select * from task where is_completed = false order by task_id";
                break;
            case "completed":
                sql = "select * from task where is_completed = true order by task_id";
                break;
            default:
                throw new RuntimeException("not supported criteria");
        }
        return getTasksBySql(sql);
    }

    private ArrayList<Task> getTasksBySql(String sql) {
        ArrayList<Task> tasks = new ArrayList<>();
        try {
            Connection connection = connectionService.establishConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next()) {
                int id = rs.getInt("task_id");
                String name = rs.getString("task_name");
                boolean isCompleted  = rs.getBoolean("is_completed");
                String description = rs.getString("description");
                LocalDate dueDate = rs.getObject("due_date", LocalDate.class);
                Task t = new Task(id, name, isCompleted, description, dueDate);
                tasks.add(t);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return tasks;
    }

    public ArrayList<Task> getAllTasks() {
        return getSubsetOfTasks("all");
    }

    public ArrayList<Task> getPendingTasks() {
        return getSubsetOfTasks("pending");
    }

    public ArrayList<Task> getCompletedTasks() {
        return getSubsetOfTasks("completed");
    }

    public int addTask(Task newTask) {
        String sql = "insert into task (task_name, is_completed, description, due_date) values (?, false, ?, ?)";
        try {
            Connection connection = connectionService.establishConnection();
            PreparedStatement pstmt = connection.prepareStatement(sql);
            pstmt.setString(1, newTask.getTaskName());
            pstmt.setString(2, newTask.getDescription());
            pstmt.setDate(3, Date.valueOf(newTask.getDueDate()));
            return pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public int completeTaskById(int id) {
        String sql = "update task set is_completed = true where task_id = ?";

        try {
            Connection connection = connectionService.establishConnection();
            PreparedStatement pstmt = connection.prepareStatement(sql);
            pstmt.setInt(1, id);
            return pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public Task getTaskById(int id) {
        String sql = "select * from task where task_id = ?";

        try {
            Connection connection = connectionService.establishConnection();
            PreparedStatement pstmt = connection.prepareStatement(sql);
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            if(rs.next()) {
                String name = rs.getString("task_name");
                boolean isCompleted = rs.getBoolean("is_completed");
                String description = rs.getString("description");
                LocalDate dueDate = rs.getObject("due_date", LocalDate.class);
                return new Task(id, name, isCompleted, description, dueDate);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public int removeTask(int id) {
        String sql = "delete from task where task_id = ?";

        try {
            Connection connection = connectionService.establishConnection();
            PreparedStatement pstmt = connection.prepareStatement(sql);
            pstmt.setInt(1, id);
            return pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
