/**
 * @file projectsData.js
 * @description Dữ liệu các bài tập thành phần cho Digital Portfolio cá nhân
 * @module projectsData
 * @course Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo
 *
 * Cấu trúc mỗi đối tượng trong mảng `projects`:
 * @typedef {Object} Project
 * @property {number}   id          - Mã định danh bài tập (1–6)
 * @property {string}   title       - Tên bài tập
 * @property {string}   coverImage  - Đường dẫn ảnh bìa minh họa
 * @property {string}   category    - Danh mục / chủ đề bài tập
 * @property {string}   objective   - Mục tiêu học tập của bài tập
 * @property {string}   process     - Tóm tắt quá trình thực hiện
 * @property {Object}   output      - Thông tin sản phẩm đầu ra
 * @property {string}   output.type - Loại sản phẩm: 'image' | 'link' | 'mixed'
 * @property {string[]} output.urls - Danh sách đường dẫn tới sản phẩm / minh chứng
 * @property {string}   output.description - Mô tả ngắn về sản phẩm đầu ra
 */

const projects = [
  {
    id: 1,
    title: "Máy tính và Các Thiết bị Ngoại vi",
    coverImage: "images/mockups/anhbia1.jpg",
    category: "Kỹ năng tin học cơ bản",

    objective: `Rèn luyện kỹ năng tạo, đổi tên, sao chép, di chuyển, xóa tệp tin và thư mục một cách thành thạo trên hệ điều hành Windows (có thể điều chỉnh cho macOS/Linux).`,

    process: `Mở File Explorer: Nhấn tổ hợp phím Windows + E hoặc nhấp vào biểu tượng thư mục màu vàng trên thanh tác vụ.
    Truy cập ổ đĩa/thư mục: Ở cột bên trái, nhấp vào This PC, sau đó nhấp đúp vào một ổ đĩa không phải ổ hệ thống (ví dụ: ổ D: hoặc E:); nếu chỉ có ổ C:, hãy vào thư mục Documents.
    Tạo thư mục mới: Nhấp chuột phải vào một khoảng trống -> chọn New -> Folder; đặt tên thư mục là ThucHanh_hotensinhvien (ví dụ: ThucHanh_NguyenVanA); nhấn Enter.
    Vào thư mục vừa tạo: Nhấp đúp vào thư mục ThucHanh_NguyenVanA.
    Tạo tệp tin văn bản: Nhấp chuột phải vào khoảng trống -> New -> Text Document; đặt tên là GhiChu.txt; nhấn Enter.
    Đổi tên tệp tin: Nhấp chuột phải vào tệp GhiChu.txt -> chọn Rename; đổi tên thành GhiChuQuanTrong.txt; nhấn Enter.
    Tạo thư mục con: Trong thư mục ThucHanh_NguyenVanA, nhấp chuột phải -> New -> Folder; đặt tên là TaiLieu.
    Sao chép tệp tin (Copy & Paste): Nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Copy (hoặc chọn tệp rồi nhấn Ctrl + C); nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống bên trong -> chọn Paste (hoặc nhấn Ctrl + V); bây giờ bạn có một bản sao của tệp trong thư mục TaiLieu.
    Di chuyển tệp tin (Cut & Paste): Quay lại thư mục ThucHanh_NguyenVanA; tạo một tệp mới tên là DiChuyen.txt; nhấp chuột phải vào tệp DiChuyen.txt -> chọn Cut (hoặc chọn tệp rồi nhấn Ctrl + X); nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống -> chọn Paste (hoặc nhấn Ctrl + V); tệp gốc đã biến mất khỏi vị trí cũ và chỉ còn ở vị trí mới.
    Xóa tệp tin: Trong thư mục TaiLieu, nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Delete; tệp sẽ được chuyển vào Thùng rác (Recycle Bin).
    Xóa vĩnh viễn: Chọn tệp DiChuyen.txt, nhấn giữ phím Shift và nhấn phím Delete; một cảnh báo sẽ hiện ra; nếu đồng ý, tệp sẽ bị xóa vĩnh viễn mà không qua Thùng rác.
    Khôi phục từ Thùng rác (Tùy chọn): Tìm biểu tượng Recycle Bin trên màn hình nền, nhấp đúp để mở; tìm tệp GhiChuQuanTrong.txt đã xóa, nhấp chuột phải vào nó và chọn Restore; tệp sẽ quay trở lại vị trí ban đầu.
    `,

    output: {
      type: "link",
      urls: ["https://docs.google.com/document/d/152tTUMUxLkbTegO4RcJVgJq3JAC2Y90NK6XWyTlEMEY/edit?usp=sharing"],
      description:
        "Đường dẫn tới sản phẩm.",
    },
  },

  {
    id: 2,
    title: "Khai thác Dữ liệu và Thông tin",
    coverImage: "images/mockups/anhbia2.jpg",
    category: "Tìm kiếm & Đánh giá thông tin",

    objective: `Phát triển kỹ năng tìm kiếm và đánh giá thông tin học thuật từ các nguồn đáng tin cậy.`,

    process: `1. Chọn một chủ đề liên quan đến ngành học của bạn.
2. Thực hiện tìm kiếm thông tin từ các nguồn sau:
- Cơ sở dữ liệu học thuật (Google Scholar, Microsoft Academic, CSDL của thư viện trường)
- Tạp chí khoa học chuyên ngành
- Sách chuyên khảo
- Các nguồn mở trên internet.
3. Thu thập ít nhất 10 tài liệu tham khảo liên quan đến chủ đề (bao gồm ít nhất 5 bài báo khoa học).
4. Đánh giá độ tin cậy của mỗi nguồn thông tin dựa trên các tiêu chí: tác giả, cơ quan xuất bản, phương pháp nghiên cứu, trích dẫn, tính cập nhật.
5. Tạo bảng tổng hợp các nguồn thông tin với đánh giá và xếp hạng độ tin cậy.`,
    output: {
      type: "link",
      urls: [
        "https://docs.google.com/document/d/15-8ZYAnOQa0VfSkQBtWD8mGIUW7G6_WsiI6BQHZ6xzE/edit?usp=sharing"
      ],
      description:
        "Đường dẫn tới sản phẩm.",
    },
  },

  {
    id: 3,
    title: "Tổng quan về Trí tuệ Nhân tạo",
    coverImage: "images/mockups/anhbia3.jpg",
    category: "Kỹ năng sử dụng AI",

    objective: `Phát triển kỹ năng viết prompt hiệu quả để tận dụng tối đa khả năng của các mô hình ngôn ngữ lớn trong học tập.`,

    process: `1. Chọn 3 tác vụ học tập phổ biến:
- Tóm tắt một bài đọc/tài liệu học thuật
- Giải thích một khái niệm phức tạp
- Tạo bộ câu hỏi ôn tập cho một chủ đề.
2. Cho mỗi tác vụ, viết 3 phiên bản prompt khác nhau:
- Prompt cơ bản (đơn giản, ngắn gọn)
- Prompt cải tiến (chi tiết hơn, có cấu trúc)
- Prompt nâng cao (áp dụng các kỹ thuật prompt engineering như role prompting, chain-of-thought, few-shot examples).
3. Thử nghiệm các prompt với một công cụ AI (như ChatGPT) và so sánh kết quả.
4. Phân tích lý do tại sao một số prompt hiệu quả hơn các prompt khác.
5. Tổng hợp các nguyên tắc và mẹo viết prompt hiệu quả dựa trên kết quả thử nghiệm.`,
    output: {
      type: "link",
      urls: [
        "https://docs.google.com/document/d/164K3rkodwWiM4A1Gj-HQK_7mWYTT95USzuqg5dp0m_A/edit?usp=sharing",
      ],
      description:
       "Đường dẫn tới sản phẩm.",
    },
  },

  {
    id: 4,
    title: "Giao tiếp và Hợp tác trong Môi trường Số",
    coverImage: "images/mockups/anhbia4.jpg",
    category: "Kỹ năng làm việc nhóm số",

    objective: `Thành thạo các công cụ hợp tác trực tuyến và thể hiện năng lực quản lý, điều phối cá nhân trong dự án nhóm.`,
    process: `1. Bối cảnh: Làm việc cùng nhóm để thực hiện một dự án nhỏ, tập trung tối đa vào vai trò và trải nghiệm cá nhân trong suốt quá trình thực hiện.
2. Lựa chọn và thiết lập công cụ: Cá nhân trực tiếp tham gia thiết lập/sử dụng ít nhất 3 công cụ hợp tác trực tuyến từ các nhóm sau:
- Công cụ quản lý dự án (Trello, Asana, ClickUp, hoặc Microsoft Planner...)
- Công cụ soạn thảo tài liệu cộng tác (Google Docs, Microsoft Office Online...)
- Công cụ lưu trữ và chia sẻ tệp (Google Drive, OneDrive, Dropbox...)
- Công cụ giao tiếp nhóm (Slack, Discord, Microsoft Teams...).
3. Thực hiện nhiệm vụ cá nhân (trong vòng 1 tuần):
- Tự quản lý danh sách nhiệm vụ được giao trên công cụ quản lý dự án.
- Ghi nhận lịch sử chỉnh sửa, đóng góp nội dung trực tiếp trên tài liệu cộng tác chung.
- Tương tác, thảo luận chủ động với các thành viên khác trên công cụ giao tiếp nhóm.
- Tổ chức và lưu trữ các tệp tin cá nhân phụ trách một cách khoa học.
4. Nhật ký minh chứng: Thu thập hình ảnh chụp màn hình ghi lại quá trình cá nhân sử dụng các công cụ, đảm bảo thể hiện rõ tên tài khoản cá nhân hoặc phần đóng góp thực tế của bản thân.`,
    output: {
      type: "link",
      urls: [
        "https://docs.google.com/document/d/17DJVWqv3HXsUZGtZUsy6XvI_7tATdeFXPDL0jv1gOFY/edit?usp=sharing",
      ],
      description:
        "Đường dẫn tới sản phẩm.",
    },
  },

  {
    id: 5,
    title: "Sáng tạo Nội dung Số",
    coverImage: "images/mockups/anhbia5.jpg",
    category: "Sáng tạo với AI",

    objective: `Thành thạo việc sử dụng các công cụ AI tạo sinh để hỗ trợ quá trình sáng tạo nội dung số.`,
    process: `1. Chọn một dự án sáng tạo nội dung (bài thuyết trình, bài viết, infographic, hoặc video ngắn).
2. Sử dụng ít nhất 3 công cụ AI tạo sinh khác nhau để hỗ trợ quá trình sáng tạo:
- Công cụ AI tạo văn bản (ChatGPT, Google Gemini, Claude)
- Công cụ AI tạo hình ảnh (DALL-E, Midjourney, Stable Diffusion)
- Công cụ AI hỗ trợ thiết kế (Canva AI, Adobe Firefly).
3. Ghi lại chi tiết quá trình sử dụng AI:
- Các prompt đã sử dụng và kết quả nhận được
- Cách bạn chỉnh sửa và tích hợp đầu ra của AI
- So sánh kết quả từ các công cụ AI khác nhau.
4. Hoàn thiện dự án bằng cách kết hợp đầu ra của AI với đóng góp sáng tạo của riêng bạn.
5. Viết phân tích về vai trò của AI trong quá trình sáng tạo, bao gồm:
- Những phần AI làm tốt và những phần còn hạn chế
- Cách AI thay đổi quy trình sáng tạo của bạn
- Các vấn đề đạo đức cần cân nhắc`,
    output: {
      type: "link",
      urls: [
        "https://docs.google.com/document/d/18Hk39EAmHvKsqdDhBwoKWrVjqZFkWcMo57wn81R5mto/edit?usp=sharing",
      ],
      description:
        "Đường dẫn tới sản phẩm.",
    },
  },

  {
    id: 6,
    title: "Phát triển kỹ năng sử dụng AI có trách nhiệm và đạo đức trong học tập và nghiên cứu.",
    coverImage: "images/mockups/anhbia6.jpg",
    category: "Đạo đức & An toàn số",

    objective: `Bài tập xây dựng nền tảng đạo đức số cho sinh viên trong bối cảnh AI ngày càng phổ biến trong học tập và nghiên cứu. Người học sẽ nhận thức rõ ranh giới giữa sử dụng AI hỗ trợ hợp lệ và gian lận học thuật, nắm vững các nguy cơ mất an toàn thông tin cá nhân trên môi trường số, đồng thời xây dựng được bộ nguyên tắc cá nhân (Personal AI Ethics Charter) định hướng hành vi số có trách nhiệm và bền vững.`,

    process: `1. Nghiên cứu chính sách của trường đại học của bạn (hoặc một trường đại học lớn ở Việt Nam) về việc sử dụng AI trong học tập và nghiên cứu.
2. Chọn một nhiệm vụ học tập (viết bài luận, chuẩn bị thuyết trình, tổng hợp tài liệu) và thực hiện với sự hỗ trợ của AI:
- Ghi lại các prompt đã sử dụng.
- Ghi lại đầu ra của AI.
- Mô tả cách bạn đánh giá, chỉnh sửa và tích hợp đầu ra của AI.
- Trích dẫn việc sử dụng AI một cách minh bạch.
3. Phân tích các vấn đề đạo đức liên quan đến việc sử dụng AI trong học thuật:
- Ranh giới giữa hỗ trợ hợp lý và gian lận học thuật.
- Vấn đề về quyền sở hữu trí tuệ và trích dẫn.
- Tác động đến quá trình học tập và phát triển kỹ năng.
4. Xây dựng bộ nguyên tắc cá nhân (5-7 nguyên tắc) về cách sử dụng AI có trách nhiệm trong học tập.
5. Tạo một infographic minh họa "Sử dụng AI có trách nhiệm trong học thuật".`,
    output: {
      type: "link",
      urls: [
        "https://docs.google.com/document/d/18QaPp1bhpFhBX-GgcU_dkeMxVSmlYEFsBHdKxwMCCjw/edit?usp=sharing",
      ],
      description:
        "Đường dẫn tới sản phẩm.",
    },
  },
];

/**
 * Lấy toàn bộ danh sách bài tập.
 * @returns {Project[]} Mảng chứa tất cả 6 bài tập thành phần.
 */
export const getAllProjects = () => projects;

/**
 * Tìm một bài tập theo id.
 * @param {number} id - Mã định danh bài tập cần tìm (1–6).
 * @returns {Project|undefined} Đối tượng bài tập tương ứng, hoặc undefined nếu không tìm thấy.
 */
export const getProjectById = (id) =>
  projects.find((project) => project.id === id);

/**
 * Lọc danh sách bài tập theo danh mục.
 * @param {string} category - Tên danh mục cần lọc.
 * @returns {Project[]} Mảng các bài tập thuộc danh mục chỉ định.
 */
export const getProjectsByCategory = (category) =>
  projects.filter((project) => project.category === category);

export default projects;