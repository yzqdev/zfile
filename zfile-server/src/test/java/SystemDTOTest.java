import im.zhaojun.zfile.model.dto.SystemConfigDTO;
import org.junit.Test;

import java.lang.reflect.Field;
import java.util.Arrays;

/**
 * @author yanni
 * @date time 2022/3/29 11:25
 * @modified By:
 */
public class SystemDTOTest {
    private Class<SystemConfigDTO> systemConfigClazz = SystemConfigDTO.class;

    @Test
    public void reflectTest() throws IllegalAccessException, NoSuchFieldException {
        SystemConfigDTO systemConfigDTO = SystemConfigDTO.builder().id(1).domain("http://localhost:8080").build();
        String key = systemConfigDTO.getDomain();
        Field f = systemConfigClazz.getDeclaredField("domain");
        f.setAccessible(true);
        System.out.println(f.get(systemConfigDTO));

    }
}
