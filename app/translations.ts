export type Lang = "en" | "uz" | "ru";

export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      certificates: "Certificates",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Abdulloh Abdubakiyev",
      title: "Junior Full-Stack Developer",
      subtitle: "Backend-Focused",
      description:
        "2+ years of experience building scalable RESTful APIs and mobile apps. Specializing in Node.js, NestJS, and React Native.",
      cta: "View My Work",
      contact: "Get In Touch",
    },
    about: {
      title: "About Me",
      text: "Junior Full-Stack Developer with 2+ years of experience, specializing in backend development. Strong expertise in building scalable RESTful APIs using Node.js, NestJS, and ExpressJS. Also experienced in mobile development with React Native.",
      location: "Uzbekistan",
      email: "abdullohabdubakiyev@gmail.com",
      phone: "+998 91 067 21 31",
      telegram: "@kaneki_798",
      github: "github.com/Abdubakiyev",
    },
    skills: {
      title: "Technical Skills",
      categories: [
        { label: "Backend", items: ["Node.js", "NestJS", "ExpressJS"] },
        { label: "Mobile", items: ["React Native"] },
        {
          label: "Databases",
          items: ["PostgreSQL", "MySQL", "MongoDB"],
        },
        {
          label: "ORM / ODM",
          items: ["Prisma", "Sequelize", "Mongoose"],
        },
        {
          label: "Authentication",
          items: ["JWT", "Role-based access", "Guards", "Email OTP"],
        },
        {
          label: "Frontend",
          items: ["HTML", "CSS", "JavaScript", "ReactJS"],
        },
        {
          label: "Tools",
          items: ["Git", "GitHub", "Postman", "Swagger", "Docker"],
        },
      ],
    },
    projects: {
      title: "Projects",
      linkPlaceholder: "Add Project Link",
      imagePlaceholder: "Add Project Image",
      list: [
        {
          name: "UzKaDubbing Platform",
          desc: "Full-stack web application with Node.js & NestJS, authentication & protected endpoints.",
          tech: ["Node.js", "NestJS", "PostgreSQL", "JWT"],
          link: "https://github.com/Abdubakiyev",
          image: "/images/project1.png",
        },
        {
          name: "Diamond Academy",
          desc: "Educational platform with NestJS, PostgreSQL, authentication, roles, and course system. (Ongoing)",
          tech: ["NestJS", "PostgreSQL", "Roles", "Courses"],
          link: "https://github.com/Abdubakiyev",
          image: "/images/project2.png",
        },
      ],
      github: "More projects on GitHub",
    },
    experience: {
      title: "Experience",
      list: [
        {
          company: "Geek Company",
          role: "Backend Developer Intern",
          period: "Ongoing",
          items: [
            "Working on real-world backend systems",
            "Improving NestJS and database skills",
            "Team collaboration on production projects",
          ],
        },
        {
          company: "Dokonect Company",
          role: "React Native Developer",
          period: "Ongoing",
          items: [
            "Developing cross-platform mobile applications using React Native",
            "Building reusable components and mobile UI screens",
            "Integrating RESTful APIs and handling asynchronous data",
            "Optimizing app performance and improving user experience",
          ],
        },
      ],
    },
    education: {
      title: "Education",
      school: "Najot Ta'lim",
      program: "Foundation Bootcamp – Full Stack Web Development",
      period: "Ongoing",
    },
    certificates: {
      title: "Certificates",
      placeholder: "Upload Certificate Image",
      empty: "Add your certificates here",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Feel free to reach out for collaborations or just a friendly hello",
      send: "Send Message",
    },
    languages: {
      title: "Languages",
      list: [
        { lang: "Uzbek", level: "Native" },
        { lang: "English", level: "Intermediate (B1)" },
        { lang: "Russian", level: "Beginner" },
      ],
    },
  },
  uz: {
    nav: {
      about: "Men haqimda",
      skills: "Ko'nikmalar",
      projects: "Loyihalar",
      experience: "Tajriba",
      certificates: "Sertifikatlar",
      contact: "Aloqa",
    },
    hero: {
      greeting: "Salom, men",
      name: "Abdulloh Abdubakiyev",
      title: "Junior Full-Stack Dasturchi",
      subtitle: "Backend Yo'nalishi",
      description:
        "2+ yillik tajriba bilan kengaytiriladigan RESTful API va mobil ilovalar yarataman. Node.js, NestJS va React Native ixtisosligim.",
      cta: "Ishlarimni Ko'ring",
      contact: "Bog'laning",
    },
    about: {
      title: "Men Haqimda",
      text: "2+ yillik tajribaga ega Junior Full-Stack Dasturchi, backend ishlab chiqishga ixtisoslashgan. Node.js, NestJS va ExpressJS yordamida kengaytiriladigan RESTful API yaratishda kuchli tajribaga egaman. React Native bilan mobil dasturlash tajribasim ham bor.",
      location: "O'zbekiston",
      email: "abdullohabdubakiyev@gmail.com",
      phone: "+998 91 067 21 31",
      telegram: "@kaneki_798",
      github: "github.com/Abdubakiyev",
    },
    skills: {
      title: "Texnik Ko'nikmalar",
      categories: [
        { label: "Backend", items: ["Node.js", "NestJS", "ExpressJS"] },
        { label: "Mobil", items: ["React Native"] },
        {
          label: "Ma'lumotlar Bazasi",
          items: ["PostgreSQL", "MySQL", "MongoDB"],
        },
        {
          label: "ORM / ODM",
          items: ["Prisma", "Sequelize", "Mongoose"],
        },
        {
          label: "Autentifikatsiya",
          items: ["JWT", "Rol asosida kirish", "Guards", "Email OTP"],
        },
        {
          label: "Frontend",
          items: ["HTML", "CSS", "JavaScript", "ReactJS"],
        },
        {
          label: "Asboblar",
          items: ["Git", "GitHub", "Postman", "Swagger", "Docker"],
        },
      ],
    },
    projects: {
      title: "Loyihalar",
      linkPlaceholder: "Loyiha havolasini qo'shing",
      imagePlaceholder: "Loyiha rasmini qo'shing",
      list: [
        {
          name: "UzKaDubbing Platformasi",
          desc: "Node.js va NestJS bilan to'liq veb-ilova, autentifikatsiya va himoyalangan endpointlar.",
          tech: ["Node.js", "NestJS", "PostgreSQL", "JWT"],
          link: "https://github.com/Abdubakiyev",
          image: "/images/project1.png",
        },
        {
          name: "Diamond Academy",
          desc: "NestJS, PostgreSQL, autentifikatsiya, rollar va kurs tizimi bilan ta'lim platformasi. (Davom etmoqda)",
          tech: ["NestJS", "PostgreSQL", "Rollar", "Kurslar"],
          link: "https://github.com/Abdubakiyev",
          image: "/images/project2.png",
        },
      ],
      github: "GitHub'da ko'proq loyihalar",
    },
    experience: {
      title: "Ish Tajribasi",
      list: [
        {
          company: "Geek Company",
          role: "Backend Dasturchi Stajyor",
          period: "Davom etmoqda",
          items: [
            "Haqiqiy backend tizimlarda ishlash",
            "NestJS va ma'lumotlar bazasi ko'nikmalarini oshirish",
            "Ishlab chiqarish loyihalarida jamoaviy hamkorlik",
          ],
        },
        {
          company: "Dokonect Company",
          role: "React Native Dasturchi",
          period: "Davom etmoqda",
          items: [
            "React Native yordamida cross-platform mobil ilovalar yaratish",
            "Qayta foydalaniluvchi komponentlar va mobil UI ekranlarini yaratish",
            "RESTful API-larni integratsiya qilish va asinxron ma'lumotlarni boshqarish",
            "Ilova unumdorligini optimallashtirish va foydalanuvchi tajribasini yaxshilash",
          ],
        },
      ],
    },
    education: {
      title: "Ta'lim",
      school: "Najot Ta'lim",
      program: "Foundation Bootcamp – Full Stack Veb Dasturlash",
      period: "Davom etmoqda",
    },
    certificates: {
      title: "Sertifikatlar",
      placeholder: "Sertifikat rasmini yuklang",
      empty: "Sertifikatlaringizni shu yerga qo'shing",
    },
    contact: {
      title: "Bog'laning",
      subtitle: "Hamkorlik yoki oddiy suhbat uchun murojaat qiling",
      send: "Xabar Yuborish",
    },
    languages: {
      title: "Tillar",
      list: [
        { lang: "O'zbek", level: "Ona tili" },
        { lang: "Ingliz", level: "O'rta daraja (B1)" },
        { lang: "Rus", level: "Boshlang'ich" },
      ],
    },
  },
  ru: {
    nav: {
      about: "Обо мне",
      skills: "Навыки",
      projects: "Проекты",
      experience: "Опыт",
      certificates: "Сертификаты",
      contact: "Контакт",
    },
    hero: {
      greeting: "Привет, я",
      name: "Абдуллох Абдубакиев",
      title: "Junior Full-Stack Разработчик",
      subtitle: "Специализация на Backend",
      description:
        "2+ года опыта в создании масштабируемых RESTful API и мобильных приложений. Специализируюсь на Node.js, NestJS и React Native.",
      cta: "Посмотреть работы",
      contact: "Связаться",
    },
    about: {
      title: "Обо Мне",
      text: "Junior Full-Stack разработчик с 2+ годами опыта, специализирующийся на backend-разработке. Глубокая экспертиза в создании масштабируемых RESTful API с использованием Node.js, NestJS и ExpressJS. Также имею опыт в мобильной разработке с React Native.",
      location: "Узбекистан",
      email: "abdullohabdubakiyev@gmail.com",
      phone: "+998 91 067 21 31",
      telegram: "@kaneki_798",
      github: "github.com/Abdubakiyev",
    },
    skills: {
      title: "Технические Навыки",
      categories: [
        { label: "Backend", items: ["Node.js", "NestJS", "ExpressJS"] },
        { label: "Мобильные", items: ["React Native"] },
        {
          label: "Базы Данных",
          items: ["PostgreSQL", "MySQL", "MongoDB"],
        },
        {
          label: "ORM / ODM",
          items: ["Prisma", "Sequelize", "Mongoose"],
        },
        {
          label: "Аутентификация",
          items: ["JWT", "Ролевой доступ", "Guards", "Email OTP"],
        },
        {
          label: "Frontend",
          items: ["HTML", "CSS", "JavaScript", "ReactJS"],
        },
        {
          label: "Инструменты",
          items: ["Git", "GitHub", "Postman", "Swagger", "Docker"],
        },
      ],
    },
    projects: {
      title: "Проекты",
      linkPlaceholder: "Добавить ссылку на проект",
      imagePlaceholder: "Добавить изображение проекта",
      list: [
        {
          name: "Платформа UzKaDubbing",
          desc: "Полностековое веб-приложение с Node.js и NestJS, аутентификацией и защищёнными эндпоинтами.",
          tech: ["Node.js", "NestJS", "PostgreSQL", "JWT"],
          link: "https://github.com/Abdubakiyev",
          image: "/images/project1.png",
        },
        {
          name: "Diamond Academy",
          desc: "Образовательная платформа с NestJS, PostgreSQL, аутентификацией, ролями и системой курсов. (В разработке)",
          tech: ["NestJS", "PostgreSQL", "Роли", "Курсы"],
          link: "https://github.com/Abdubakiyev",
          image: "/images/project2.png",
        },
      ],
      github: "Больше проектов на GitHub",
    },
    experience: {
      title: "Опыт Работы",
      list: [
        {
          company: "Geek Company",
          role: "Стажёр Backend-разработчик",
          period: "В процессе",
          items: [
            "Работа над реальными backend-системами",
            "Совершенствование навыков NestJS и баз данных",
            "Командная работа над production-проектами",
          ],
        },
        {
          company: "Dokonect Company",
          role: "React Native Разработчик",
          period: "В процессе",
          items: [
            "Разработка кроссплатформенных мобильных приложений на React Native",
            "Создание переиспользуемых компонентов и мобильных UI-экранов",
            "Интеграция RESTful API и работа с асинхронными данными",
            "Оптимизация производительности приложения и улучшение UX",
          ],
        },
      ],
    },
    education: {
      title: "Образование",
      school: "Najot Ta'lim",
      program: "Foundation Bootcamp – Full Stack Web Development",
      period: "В процессе",
    },
    certificates: {
      title: "Сертификаты",
      placeholder: "Загрузить изображение сертификата",
      empty: "Добавьте ваши сертификаты здесь",
    },
    contact: {
      title: "Свяжитесь",
      subtitle: "Напишите мне для сотрудничества или просто поздоровайтесь",
      send: "Отправить сообщение",
    },
    languages: {
      title: "Языки",
      list: [
        { lang: "Узбекский", level: "Родной" },
        { lang: "Английский", level: "Средний (B1)" },
        { lang: "Русский", level: "Начальный" },
      ],
    },
  },
};