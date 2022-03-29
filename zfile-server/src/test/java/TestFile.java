import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author yanni
 * @date time 2022/3/29 1:05
 * @modified By:
 */
public class TestFile {
    public static void main(String[] args){
        Path path = Paths.get("E:\\downloads\\a.mp4");
        String contentType = null;
        try {
            contentType = Files.probeContentType(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("File content type is : " + contentType);
    }
}
