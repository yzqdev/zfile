package im.zhaojun.zfile.controller.home;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.lang.Console;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import im.zhaojun.zfile.context.DriveContext;
import im.zhaojun.zfile.exception.NotEnabledDriveException;
import im.zhaojun.zfile.model.constant.ZFileConstant;
import im.zhaojun.zfile.model.dto.FileItemDTO;
import im.zhaojun.zfile.model.entity.DriveConfig;
import im.zhaojun.zfile.model.enums.FileTypeEnum;
import im.zhaojun.zfile.service.DriveConfigService;
import im.zhaojun.zfile.service.base.AbstractBaseFileService;
import im.zhaojun.zfile.util.HttpUtil;
import org.springframework.stereotype.Controller;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.HandlerMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

/**
 * 直链 Controller
 * @author Zhao Jun
 */
@Controller
public class DirectLinkController {

    @Resource
    private DriveContext driveContext;

    @Resource
    private DriveConfigService driveConfigService;

    /**
     * 获取指定驱动器, 某个文件的直链, 然后重定向过去.
     * @param   driveId
     *          驱动器 ID
     *
     * @return  重定向至文件直链
     */
    @GetMapping("/${zfile.directLinkPrefix}/{driveId}/**")
    public String directlink(@PathVariable("driveId") String driveId,
                             final HttpServletRequest request,
                             final HttpServletResponse response) throws IOException {
        DriveConfig driveConfig = driveConfigService.findById(driveId);
        Boolean enable = driveConfig.getEnable();
        if (Boolean.FALSE.equals(enable)) {
            throw new NotEnabledDriveException();
        }

        String path = (String) request.getAttribute(
                HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        String bestMatchPattern = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
        AntPathMatcher apm = new AntPathMatcher();
        Console.log("bestMatchPattern: {}", bestMatchPattern);
        Console.log("path: {}", path);
        String filePath = apm.extractPathWithinPattern(bestMatchPattern, path);
        Console.log(filePath);
        Console.log("filePath: {}", filePath);
        if (filePath.length() > 0 && filePath.charAt(0) != ZFileConstant.PATH_SEPARATOR_CHAR) {
            filePath = "/" + filePath;
        }

        AbstractBaseFileService fileService = driveContext.get(driveId);
        FileItemDTO fileItem = fileService.getFileItem(filePath);

        String url = fileItem.getSrc();
        if (StrUtil.equalsIgnoreCase(FileUtil.extName(fileItem.getName()), "m3u8")) {
            String textContent = HttpUtil.getTextContent(url);
            response.setContentType("application/vnd.apple.mpegurl;charset=utf-8");
            PrintWriter out = response.getWriter();
            out.write(textContent);
            out.flush();
            out.close();
            return null;
        }

        int queryIndex = url.indexOf('?');

        if (queryIndex != -1) {
            String origin = url.substring(0, queryIndex);
            String queryString = url.substring(queryIndex + 1);

            url = URLUtil.encode(origin) + "?" + URLUtil.encode(queryString);
        } else {
            url = URLUtil.encode(url);
        }


        if (Objects.equals(fileItem.getType(), FileTypeEnum.FOLDER)) {
            return "redirect:" + fileItem.getSrc();
        } else {
            return "redirect:" + url;
        }
    }

}