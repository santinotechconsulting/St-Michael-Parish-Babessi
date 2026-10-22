import {
  ParishInfo,
  MassSchedule,
  SacramentInfo,
  MinistryGroup,
  Announcement,
  ParishEvent,
  SupportProject,
  GalleryItem,
  ScriptureReflection,
  DailyLiturgyAndSaint
} from '../types';

export const initialParishInfo: ParishInfo = {
  name: "St. Michael Parish, Babessi",
  tagline: "Growing in Faith, United in Christ.",
  denomination: "Roman Catholic Church",
  location: "Babessi, Northwest Region, Cameroon",
  diocese: "Archdiocese of Bamenda (Ndop Deanery)",
  archdiocese: "Ecclesiastical Province of Bamenda",
  country: "Cameroon",
  phonePlaceholder: "+237 677 677 057",
  emailPlaceholder: "contact@stmichaelbabessi.org",
  addressPlaceholder: "St. Michael Catholic Church, Mission Road, Babessi Sub-Division, Ngoketunjia Division, Northwest Region, Cameroon",
  officeHours: "Tuesday – Friday: 9:00 AM – 3:00 PM | Saturday: 9:00 AM – 1:00 PM | Sunday: Closed for Liturgy | Monday: Clergy Day of Rest",
  priestNamePlaceholder: "Rev. Fr. Leonard Akuimbeni",
  priestTitle: "Parish Priest",
  priestWelcomeMessage: "Dear brothers and sisters in Christ, visitors, and friends of St. Michael Parish Babessi, you are cordially welcome to our parish family. Our parish is a sanctuary where God's mercy flows, the Holy Eucharist nourishes our pilgrims on earth, and the faithful stand steadfast under the heavenly protection of our great patron, St. Michael the Archangel. Whether you are a lifelong parishioner or seeking a spiritual home, our doors and hearts are open to you.",
  pastoralReflection: "St. Paul reminds us: 'Be watchful, stand firm in the faith, act like men, be strong. Let all that you do be done in love.' (1 Corinthians 16:13-14). In every trial, let us draw near to the sacraments and walk together as one family of God.",
  heroWelcomeMessage: "Welcome to St. Michael Parish, Babessi — a community united in faith, nourished by the Eucharist, and called to live the love of Christ. We invite you to grow with us through prayer, worship, service, and fellowship.",
  momoMtn: "+237 677 677 057 (Fr. Leonard Akuimbeni / St. Michael Parish)",
  momoOrange: "+237 677 677 057 / Parish Secretariat",
  bankAccount: "[Ecobank / NFC Bank / BICEC Account Number to be provided]",
  accountName: "St. Michael Catholic Church Babessi"
};

export const initialMassSchedules: MassSchedule[] = [
  {
    id: "mass-1",
    celebrationName: "First Sunday Mass (Early Morning)",
    dayOfWeek: "Sunday",
    startTime: "07:00 AM",
    endTime: "08:30 AM",
    location: "Main Parish Sanctuary",
    frequency: "Weekly",
    language: "English & Local Languages",
    additionalInstructions: "Preceded by Morning Prayer & Rosary at 6:30 AM",
    isActive: true
  },
  {
    id: "mass-2",
    celebrationName: "Principal Parish Community Mass",
    dayOfWeek: "Sunday",
    startTime: "09:30 AM",
    endTime: "11:30 AM",
    location: "Main Parish Sanctuary",
    frequency: "Weekly",
    language: "English with Choir Anthems & Traditional Liturgical Hymns",
    additionalInstructions: "Solemn celebration with full choir, children liturgy, and parish announcements",
    isActive: true
  },
  {
    id: "mass-3",
    celebrationName: "Weekday Morning Mass",
    dayOfWeek: "Tuesday to Friday",
    startTime: "06:30 AM",
    endTime: "07:15 AM",
    location: "Parish Chapel / Main Altar",
    frequency: "Daily (Tue - Fri)",
    language: "English",
    additionalInstructions: "Quiet celebration followed by silent thanksgiving",
    isActive: true
  },
  {
    id: "mass-4",
    celebrationName: "Eucharistic Adoration & Benediction",
    dayOfWeek: "Thursday",
    startTime: "05:00 PM",
    endTime: "06:30 PM",
    location: "Parish Chapel of Perpetual Adoration",
    frequency: "Weekly",
    language: "Silent Adoration & Chants",
    additionalInstructions: "Silent adoration, litany of the Holy Eucharist, and Benediction of the Blessed Sacrament",
    isActive: true
  },
  {
    id: "mass-5",
    celebrationName: "Sacrament of Reconciliation (Confessions)",
    dayOfWeek: "Saturday",
    startTime: "04:00 PM",
    endTime: "05:30 PM",
    location: "Parish Confessionals",
    frequency: "Weekly & by Appointment",
    language: "English / Pidgin / Local Dialects",
    additionalInstructions: "Also available upon personal request before weekday Masses",
    isActive: true
  },
  {
    id: "mass-6",
    celebrationName: "Saturday Morning Mass & Marian Devotion",
    dayOfWeek: "Saturday",
    startTime: "07:00 AM",
    endTime: "08:00 AM",
    location: "Main Sanctuary",
    frequency: "Weekly",
    language: "English",
    additionalInstructions: "Votive Mass of the Blessed Virgin Mary followed by recitation of the Holy Rosary",
    isActive: true
  },
  {
    id: "mass-7",
    celebrationName: "Solemn Feast of St. Michael the Archangel",
    dayOfWeek: "September 29th (Annual)",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    location: "Parish Grounds & Sanctuary",
    frequency: "Annual Patronal Celebration",
    language: "Multilingual Solemn Mass",
    additionalInstructions: "Preceded by the 9-day St. Michael Novena. Community cultural reception follows.",
    isActive: true,
    isSpecialSeason: true
  }
];

export const initialSacraments: SacramentInfo[] = [
  {
    id: "baptism",
    name: "Sacrament of Baptism",
    latinName: "Baptisma",
    category: "Initiation",
    shortSummary: "The gateway to life in the Spirit and the door which gives access to the other sacraments.",
    fullExplanation: "Holy Baptism is the basis of the whole Christian life, the gateway to life in the Spirit, and the door which gives access to the other sacraments. Through Baptism we are freed from sin and reborn as children of God; we become members of Christ, are incorporated into the Church and made sharers in her mission.",
    whoShouldContact: "Parents of infants seeking baptism, or adults desiring to join the Catholic Church through the Order of Christian Initiation of Adults (OCIA).",
    generalPreparation: "Parents and godparents are required to attend pre-baptismal catechesis sessions. Godparents must be practicing Catholic adults who have received the Sacraments of Initiation.",
    requiredDocuments: [
      "Child's official birth certificate",
      "Parents' Catholic marriage certificate (if applicable)",
      "Godparent verification or Confirmation card"
    ],
    howToArrange: "Visit the parish office on Tuesday or Thursday to register for pre-baptism classes at least 4 weeks before the desired celebration."
  },
  {
    id: "eucharist",
    name: "First Holy Communion (The Eucharist)",
    latinName: "Sanctissima Eucharistia",
    category: "Initiation",
    shortSummary: "The source and summit of Christian life, wherein Christ gives His true Body and Blood.",
    fullExplanation: "The holy Eucharist completes Christian initiation. Those who have been raised to the dignity of the royal priesthood by Baptism and configured more deeply to Christ by Confirmation participate with the whole community in the Lord's own sacrifice by means of the Eucharist.",
    whoShouldContact: "Children from age 7 and above who have attained the age of reason and completed catechism preparation, as well as adult catechumens.",
    generalPreparation: "Completion of 1–2 years of parish catechism classes and first celebration of the Sacrament of Reconciliation.",
    requiredDocuments: [
      "Parish Baptismal Certificate",
      "Catechism attendance record signed by parish catechist"
    ],
    howToArrange: "Enroll children at the beginning of the pastoral catechism year (September/October) through the Catechetical Office."
  },
  {
    id: "confirmation",
    name: "Sacrament of Confirmation",
    latinName: "Confirmatio",
    category: "Initiation",
    shortSummary: "The special outpouring of the Holy Spirit as once granted to the Apostles on Pentecost.",
    fullExplanation: "Confirmation perfects Baptismal grace; it is the sacrament which gives the Holy Spirit in order to root us more deeply in the divine filiation, incorporate us more firmly into Christ, strengthen our bond with the Church, associate us more closely with her mission, and help us bear witness to the Christian faith.",
    whoShouldContact: "Baptized Catholics who have reached the age of discretion (typically teenagers and adults) and wish to complete Christian initiation.",
    generalPreparation: "Weekly catechism sessions, parish service project, and a dedicated spiritual retreat.",
    requiredDocuments: [
      "Baptismal Certificate with First Communion notation",
      "Sponsor's certificate of active Catholic practice"
    ],
    howToArrange: "Register with the Parish Catechist coordinator during the annual enrollment period."
  },
  {
    id: "reconciliation",
    name: "Sacrament of Penance & Reconciliation",
    latinName: "Paenitentia",
    category: "Healing",
    shortSummary: "Pardon from God's mercy for sins committed after Baptism and reconciliation with the Church.",
    fullExplanation: "Those who approach the sacrament of Penance obtain pardon from God's mercy for the offense committed against him, and are, at the same time, reconciled with the Church which they have wounded by their sins and which by charity, by example, and by prayer labors for their conversion.",
    whoShouldContact: "All baptized Catholics in need of forgiveness, spiritual renewal, or counsel.",
    generalPreparation: "A sincere Examination of Conscience, genuine contrition, firm purpose of amendment, confession to the priest, and fulfillment of penance.",
    requiredDocuments: ["None. A sincere and repentant heart."],
    howToArrange: "Available every Saturday from 4:00 PM – 5:30 PM, Thursday during Eucharistic Adoration, or privately by appointment."
  },
  {
    id: "marriage",
    name: "Sacrament of Matrimony",
    latinName: "Matrimonium",
    category: "Service",
    shortSummary: "A holy covenant by which a baptized man and woman establish an intimate partnership of life and love.",
    fullExplanation: "The matrimonial covenant, by which a man and a woman establish between themselves a partnership of the whole of life, is by its nature ordered toward the good of the spouses and the procreation and education of offspring; this covenant between baptized persons has been raised by Christ the Lord to the dignity of a sacrament.",
    whoShouldContact: "Couples intending to enter holy matrimony according to the canonical form of the Catholic Church.",
    generalPreparation: "At least 6 months notice prior to the planned wedding date. Completion of Pre-Cana marriage courses and publication of Marriage Banns.",
    requiredDocuments: [
      "Newly issued Baptismal Certificates (issued within the last 6 months)",
      "Confirmation certificates for both parties",
      "Civil status certificate or marriage certificate",
      "Affidavits of freedom to marry"
    ],
    howToArrange: "Book an appointment with the Parish Priest at least 6 months prior to setting any wedding date."
  },
  {
    id: "anointing",
    name: "Anointing of the Sick",
    latinName: "Unctio Infirmorum",
    category: "Healing",
    shortSummary: "Spiritual strength, peace, and courage for those enduring severe illness or old age.",
    fullExplanation: "By the sacred anointing of the sick and the prayer of the priests the whole Church commends those who are ill to the suffering and glorified Lord, that he may raise them up and save them. And indeed she exhorts them to contribute to the good of the People of God by freely uniting themselves to the Passion and death of Christ.",
    whoShouldContact: "Any parishioner facing serious illness, undergoing major surgery, or experiencing the infirmities of elderly age.",
    generalPreparation: "When possible, preparation includes the Sacrament of Reconciliation and Viaticum (Holy Communion for the journey).",
    requiredDocuments: ["None."],
    howToArrange: "Contact the parish office immediately. In urgent pastoral emergencies at home or hospital, priests can be called at any hour."
  },
  {
    id: "holy-orders",
    name: "Holy Orders & Vocations",
    latinName: "Ordo",
    category: "Service",
    shortSummary: "The sacrament of apostolic ministry through which Christ's mission continues in His Church.",
    fullExplanation: "Holy Orders is the sacrament through which the mission entrusted by Christ to his apostles continues to be exercised in the Church until the end of time: thus it is the sacrament of apostolic ministry. It includes three degrees: episcopate, presbyterate, and diaconate.",
    whoShouldContact: "Young men discerning a vocation to the diocesan priesthood or religious life, and young women discerning consecrated religious life.",
    generalPreparation: "Regular spiritual direction, participation in diocesan vocation discernment camps, and academic qualification for seminary or novitiate.",
    requiredDocuments: ["Vocation discernment dossier from the Diocesan Vocations Director."],
    howToArrange: "Speak confidentially with the Parish Priest or contact the Diocesan Vocations Director."
  }
];

export const initialMinistries: MinistryGroup[] = [
  {
    id: "cwa",
    name: "Catholic Women's Association (CWA)",
    acronym: "CWA",
    category: "Devotional",
    shortDesc: "Dedicated Catholic women fostering deep spiritual life, family values, and community works of mercy.",
    fullDesc: "The Catholic Women's Association in Babessi brings together women of faith under the patronage of Our Lady of Good Counsel. They are the backbone of parish hospitality, charity to widows and orphans, and liturgical decoration.",
    mission: "To evangelize through dedicated prayer, exemplary Christian motherly living, and active charity in the church and society.",
    activities: [
      "Weekly recitation of the Holy Rosary and devotional prayers",
      "Visitations and food hampers to the sick, elderly, and displaced families",
      "Maintenance and floral arrangement for the sanctuary",
      "Organization of parish feast receptions and harvest thanksgiving"
    ],
    meetingSchedule: "Every Sunday immediately after the Principal Parish Mass (12:00 PM) at the CWA Hall",
    leadershipRole: "CWA Parish President",
    leaderNamePlaceholder: "[Name to be updated by CWA Executive]",
    membershipInfo: "Open to all baptized Catholic women, wives, mothers, and single women living in communion with the Church.",
    imageUrl: "/src/assets/images/parish_community_gathering_1792699771967.jpg",
    isActive: true
  },
  {
    id: "cma",
    name: "Catholic Men's Association (CMA)",
    acronym: "CMA",
    category: "Devotional",
    shortDesc: "Catholic men walking in the footsteps of St. Joseph as heads of Christian households and parish pillars.",
    fullDesc: "The Catholic Men's Association unites men of the parish under the patronage of St. Joseph the Worker. Members strive to build strong Christian families, uphold parish infrastructure, and mentor young men.",
    mission: "To promote Christian manhood, defend sound Catholic doctrine, support parish development projects, and strengthen family spiritual leadership.",
    activities: [
      "Monthly spiritual recollection and men's fellowship breakfast",
      "Voluntary parish maintenance and manual work days",
      "Support of vocations to the priesthood and religious life",
      "Assistance with parish security and liturgical order"
    ],
    meetingSchedule: "First and Third Sundays of the month at 12:30 PM in St. Joseph Room",
    leadershipRole: "CMA Parish President",
    leaderNamePlaceholder: "[Name to be updated by CMA Executive]",
    membershipInfo: "Open to all Catholic fathers and men striving to practice their Catholic faith with conviction.",
    imageUrl: "/src/assets/images/parish_community_gathering_1792699771967.jpg",
    isActive: true
  },
  {
    id: "cya",
    name: "Catholic Youth Association (CYA)",
    acronym: "CYA",
    category: "Youth",
    shortDesc: "A vibrant fraternity of Catholic youth growing in faith, holiness, and community leadership.",
    fullDesc: "The CYA at St. Michael Parish is a dynamic community of young Catholics who channel their energy into liturgical animation, youth retreats, sports evangelism, and community development.",
    mission: "To help young people encounter Jesus Christ personally, build authentic Christian friendships, and become courageous witnesses in society.",
    activities: [
      "Bi-weekly youth fellowship, praise, and Bible study",
      "Animated Youth Masses on designated Sundays",
      "Annual Diocesan and Parish Youth Day rallies",
      "Community sanitation exercises and sports tournaments"
    ],
    meetingSchedule: "Every Saturday afternoon at 3:00 PM at the Parish Youth Centre",
    leadershipRole: "Parish Youth Coordinator",
    leaderNamePlaceholder: "[Name to be updated by Youth Executive]",
    membershipInfo: "Open to all Catholic youth between the ages of 15 and 35.",
    imageUrl: "/src/assets/images/parish_community_gathering_1792699771967.jpg",
    isActive: true
  },
  {
    id: "choir",
    name: "St. Cecilia Parish Choir",
    acronym: "Choir",
    category: "Liturgical",
    shortDesc: "Elevating the liturgy with reverent sacred hymns, Latin polyphony, and joyful African choral praise.",
    fullDesc: "The choir ministers through sacred music to assist the congregation in prayerful participation during the celebration of the Holy Mass, weddings, funerals, and major liturgical solemnities.",
    mission: "To praise the Almighty God through beauty and sacred song and lead the assembly into deeper adoration.",
    activities: [
      "Vocal training and sight-reading practice",
      "Liturgical preparation for Sunday Masses and feasts",
      "Choral festivals and parish carols of nine lessons",
      "Rehearsal of Gregorian chants and traditional hymns"
    ],
    meetingSchedule: "Wednesday and Friday evenings at 5:00 PM in the Parish Church",
    leadershipRole: "Choir Master / President",
    leaderNamePlaceholder: "[Name to be updated by Choir Executive]",
    membershipInfo: "Open to anyone with a musical voice, commitment to rehearsals, and love for sacred liturgy.",
    imageUrl: "/src/assets/images/parish_community_gathering_1792699771967.jpg",
    isActive: true
  },
  {
    id: "altar-servers",
    name: "St. Tarcisius Altar Servers Guild",
    acronym: "Altar Servers",
    category: "Liturgical",
    shortDesc: "Dedicated boys and girls serving with reverent precision at the altar of the Lord.",
    fullDesc: "Under the patronage of St. Tarcisius, the altar servers assist the priests and deacons at the sacred altar, fostering reverent liturgical worship and early seeds of priestly vocations.",
    mission: "To serve the Lord with purity of heart, punctuality, and deep reverence in the sanctuary.",
    activities: [
      "Liturgical training on sacred vessels, vestments, and movements",
      "Serving daily and Sunday Eucharistic liturgies",
      "Weekly prayer meeting and catechism review",
      "Sanctuary preparation and incense service"
    ],
    meetingSchedule: "Every Saturday morning at 9:00 AM in the Sacristy",
    leadershipRole: "Senior Master of Ceremonies",
    leaderNamePlaceholder: "[Name to be updated by Altar Guild]",
    membershipInfo: "Boys and girls who have received First Holy Communion and demonstrate regular church attendance.",
    imageUrl: "/src/assets/images/parish_eucharist_mass_1792699771885.jpg",
    isActive: true
  },
  {
    id: "catechists",
    name: "Parish Catechists & Religious Instructors",
    category: "Council",
    shortDesc: "Forming children and converts in Catholic doctrine, Sacred Scripture, and the Sacraments.",
    fullDesc: "Catechists are authorized lay teachers who collaborate closely with the Parish Priest to guide souls through Baptism, First Communion, Confirmation, and the OCIA journey.",
    mission: "To faithfully transmit the deposit of the Catholic faith from generation to generation in Babessi.",
    activities: [
      "Sunday Catechism classes for primary and secondary students",
      "Adult faith formation and instruction of catechumens",
      "Conducting Sunday Services in outstations when priests are not present",
      "Preparation of candidates for sacramental examinations"
    ],
    meetingSchedule: "Monthly pedagogical briefing on the 1st Saturday at 10:00 AM",
    leadershipRole: "Chief Catechist",
    leaderNamePlaceholder: "[Name to be updated by Catechist Deanery]",
    membershipInfo: "Appointed practicing Catholics of exemplary moral standing and catechetical training.",
    imageUrl: "/src/assets/images/hero_church_parish_1792699770017.jpg",
    isActive: true
  },
  {
    id: "lectors",
    name: "Guild of Lectors & Readers",
    category: "Liturgical",
    shortDesc: "Proclaiming the Living Word of God with clarity, reverence, and spiritual understanding.",
    fullDesc: "Lectors are commissioned ministers who prepare diligently to proclaim the First and Second Readings, Responsorial Psalm, and Universal Prayer during holy liturgy.",
    mission: "To break open the bread of Sacred Scripture so that the faithful may hear God speaking to them.",
    activities: [
      "Scriptural study and pronunciation workshops",
      "Proclamation roster for all Sunday and feast day Masses",
      "Spiritual reflection on Sunday readings prior to proclamation"
    ],
    meetingSchedule: "Every Thursday at 5:30 PM for Scripture preparation",
    leadershipRole: "Lectors Guild Leader",
    leaderNamePlaceholder: "[Name to be updated by Lectors Coordinator]",
    membershipInfo: "Confirmed Catholics with good vocal clarity and commitment to liturgical decorum.",
    imageUrl: "/src/assets/images/parish_eucharist_mass_1792699771885.jpg",
    isActive: true
  },
  {
    id: "scc",
    name: "Small Christian Communities (SCC)",
    category: "Devotional",
    shortDesc: "Neighborhood cells of Christian fellowship, Gospel sharing, and localized mutual aid.",
    fullDesc: "Divided across the quarters of Babessi and neighboring mission outstations, Small Christian Communities are the heartbeat of localized parish presence where neighbors pray, share the Bible, and assist one another.",
    mission: "To live the Gospel concretely in the neighborhood and ensure no parishioner is isolated or forgotten.",
    activities: [
      "Weekly neighborhood Gospel sharing using the 7-step method",
      "Mutual solidarity in moments of joy (childbirth) and sorrow (bereavement)",
      "Collection of parish tithes and harvest pledges from quarters",
      "Grassroots conflict resolution and prayer chains"
    ],
    meetingSchedule: "Every Tuesday evening at 6:00 PM rotating among family homes in each quarter",
    leadershipRole: "Parish Pastoral Council SCC Coordinator",
    leaderNamePlaceholder: "[Name to be updated by Pastoral Council]",
    membershipInfo: "All parishioners reside within a designated neighborhood SCC quarter.",
    imageUrl: "/src/assets/images/parish_community_gathering_1792699771967.jpg",
    isActive: true
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Solemn Novena to St. Michael the Archangel & Patronal Feast Preparation",
    slug: "st-michael-novena-feast-preparation",
    category: "Liturgical Notice",
    featuredImage: "/src/assets/images/st_michael_patron_1792699772746.jpg",
    summary: "Join the entire parish community for 9 days of intense prayer, spiritual protection, and fellowship as we prepare for our annual Patronal Feast Day.",
    content: "The Parish Pastoral Council cordially invites all parishioners and outstations to the annual Nine-Day Novena in honor of St. Michael the Archangel. Each evening beginning at 5:00 PM, we will pray the Rosary, the Litany of St. Michael, and participate in Eucharistic Adoration followed by Holy Mass. All ministries, families, and quarters are invited to turn out in their respective uniforms. Come and seek the powerful intercession of St. Michael for our parish, our families, and peace in our region.",
    author: "Parish Pastoral Council",
    date: "2026-09-20",
    isPublished: true,
    isFeatured: true
  },
  {
    id: "ann-2",
    title: "Registration for New Catechism Classes & First Holy Communion 2026/2027",
    slug: "catechism-registration-new-year",
    category: "Sunday Bulletin",
    featuredImage: "/src/assets/images/parish_eucharist_mass_1792699771885.jpg",
    summary: "Parents and guardians are requested to enroll their children for First Holy Communion and Confirmation catechism classes before the deadline.",
    content: "Registration for the 2026/2027 Catechetical Formation Year is now open. Parents wishing to enroll their children must submit copies of baptismal certificates at the Catechist Office. Classes for Stage 1 (Prayer & Initial Catechism), Stage 2 (First Holy Communion), and Stage 3 (Confirmation) will officially commence on the first Saturday of next month. Let us take the spiritual formation of our children as our primary Christian duty.",
    author: "Chief Catechist & Liturgy Committee",
    date: "2026-10-10",
    isPublished: true,
    isFeatured: true
  },
  {
    id: "ann-3",
    title: "Church Hall Roofing & Sanctuary Renovation Phase II Launch",
    slug: "parish-renovation-project-phase-2",
    category: "Community Outreach",
    featuredImage: "/src/assets/images/hero_church_parish_1792699770017.jpg",
    summary: "The Parish Finance Committee announces the commencement of Phase II of the parish hall rehabilitation and sanctuary soundproofing.",
    content: "Following the successful completion of the foundation and wall reinforcements, the Parish Finance Council is pleased to announce the launch of Phase II for the Church Hall and Sanctuary. We thank all parishioners, mission outstations, and friends in the diaspora who have contributed so generously. The targets and mobile money donation numbers are posted on the Parish Support page.",
    author: "Parish Finance Council",
    date: "2026-10-18",
    isPublished: true,
    isFeatured: false
  },
  {
    id: "ann-4",
    title: "Pastoral Directive on Mass Intentions and Stipends",
    slug: "pastoral-directive-mass-intentions",
    category: "Pastoral Letter",
    summary: "A gentle reminder from the Parish Priest concerning the theological meaning of Mass Intentions and the procedure for submitting them.",
    content: "The holy sacrifice of the Mass is of infinite value. When we request a Mass intention for thanksgiving, for the healing of the sick, or for the repose of the souls of our beloved departed, we unite our prayer with the sacrifice of Christ on Calvary. Please note that Mass intentions should be booked at the parish office at least one week ahead to ensure inclusion in the parish weekly bulletin.",
    author: "Parish Priest",
    date: "2026-10-05",
    isPublished: true,
    isFeatured: false
  }
];

export const initialEvents: ParishEvent[] = [
  {
    id: "evt-1",
    title: "Parish Feast of St. Michael the Archangel Solemn High Mass",
    date: "2026-09-29",
    startTime: "09:30 AM",
    endTime: "01:30 PM",
    venue: "St. Michael Parish Main Sanctuary & Compound",
    category: "Feast",
    description: "The grand annual celebration of our parish patron saint with concelebrated Mass, blessing of families, cultural dances, and fraternal agape feast.",
    organizer: "Parish Pastoral Council & Feast Committee",
    isPublished: true,
    registrationRequired: true,
    imageUrl: "/src/assets/images/st_michael_patron_1792699772746.jpg"
  },
  {
    id: "evt-2",
    title: "Parish-Wide Eucharistic Day of Recollection & Healing",
    date: "2026-11-07",
    startTime: "08:00 AM",
    endTime: "03:00 PM",
    venue: "Main Church & Chapel",
    category: "Retreat",
    description: "A day dedicated to spiritual renewal, silent meditation, talks on prayer, confessions with visiting priests, and solemn Eucharistic adoration.",
    organizer: "Liturgy & Spiritual Life Committee",
    isPublished: true,
    registrationRequired: true,
    imageUrl: "/src/assets/images/hero_church_parish_1792699770017.jpg"
  },
  {
    id: "evt-3",
    title: "Youth Fellowship Rally & Sports Evangelism Day",
    date: "2026-11-14",
    startTime: "01:00 PM",
    endTime: "06:00 PM",
    venue: "Parish School Grounds, Babessi",
    category: "Youth",
    description: "Friendly football and handball matches between quarter youth teams, praise songs, and interactive session on Christian leadership in challenging times.",
    organizer: "Catholic Youth Association (CYA)",
    isPublished: true,
    registrationRequired: false,
    imageUrl: "/src/assets/images/parish_community_gathering_1792699771967.jpg"
  },
  {
    id: "evt-4",
    title: "Solemnity of Christ the King Eucharistic Procession",
    date: "2026-11-22",
    startTime: "08:30 AM",
    endTime: "12:30 PM",
    venue: "Procession across Babessi Township to Parish Sanctuary",
    category: "Liturgy",
    description: "Public manifestation of faith: carrying the Blessed Sacrament through the streets of Babessi with choir singing, canopy, and final Benediction at the altar.",
    organizer: "Parish Liturgical Commission",
    isPublished: true,
    registrationRequired: false,
    imageUrl: "/src/assets/images/parish_eucharist_mass_1792699771885.jpg"
  }
];

export const initialProjects: SupportProject[] = [
  {
    id: "proj-1",
    title: "Church Hall Rehabilitation & Roofing Project",
    category: "Infrastructure",
    description: "Renovation of the multi-purpose parish hall to serve catechism classes, youth meetings, community conflict resolution dialogues, and wedding receptions.",
    targetAmountXAF: 8500000,
    raisedAmountXAF: 5200000,
    deadline: "December 2026",
    status: "active"
  },
  {
    id: "proj-2",
    title: "Borehole & Clean Water for Parish Community & Dispensary",
    category: "Charity & Social Welfare",
    description: "Drilling a solar-powered borehole to provide constant, potable clean water for parishioners, school children, and surrounding Babessi families.",
    targetAmountXAF: 4200000,
    raisedAmountXAF: 2850000,
    deadline: "January 2027",
    status: "active"
  },
  {
    id: "proj-3",
    title: "Sacred Liturgical Vestments & Altar Vessels Fund",
    category: "Liturgy",
    description: "Acquisition of liturgical vestments (chasubles, albs, stoles in liturgical colors) and sacred chalices and ciboria for the main sanctuary and outstations.",
    targetAmountXAF: 1800000,
    raisedAmountXAF: 1450000,
    deadline: "November 2026",
    status: "active"
  },
  {
    id: "proj-4",
    title: "Educational Scholarships for Needy Parish Children",
    category: "Education & Youth",
    description: "Annual fund supporting school fees, exercise books, and uniforms for orphan children and displaced families in our parish community.",
    targetAmountXAF: 3000000,
    raisedAmountXAF: 1950000,
    deadline: "Ongoing",
    status: "active"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Solemn Altar & Sanctuary of St. Michael Church",
    category: "Holy Mass",
    mediaType: "image",
    url: "/src/assets/images/hero_church_parish_1792699770017.jpg",
    caption: "The peaceful sanctuary bathed in morning light before the celebration of the Eucharist.",
    date: "2026-09-15"
  },
  {
    id: "gal-2",
    title: "Elevation of the Sacred Host during Holy Mass",
    category: "Holy Mass",
    mediaType: "image",
    url: "/src/assets/images/parish_eucharist_mass_1792699771885.jpg",
    caption: "'Behold the Lamb of God, behold Him who takes away the sins of the world.'",
    date: "2026-09-22"
  },
  {
    id: "gal-3",
    title: "Patron Saint Michael the Archangel Shrine",
    category: "Parish Feast",
    mediaType: "image",
    url: "/src/assets/images/st_michael_patron_1792699772746.jpg",
    caption: "Our glorious patron saint, defender of the Church against the snares of evil.",
    date: "2026-09-29"
  },
  {
    id: "gal-4",
    title: "Parishioners and Choir in Joyful Fellowship",
    category: "Community Outreach",
    mediaType: "image",
    url: "/src/assets/images/parish_community_gathering_1792699771967.jpg",
    caption: "Joyful faces of our parish community united in praise following Sunday Thanksgiving Mass.",
    date: "2026-10-04"
  }
];

export const initialScriptureReflection: ScriptureReflection = {
  id: "ref-current",
  date: "2026-10-25",
  liturgicalTitle: "Thirtieth Sunday in Ordinary Time (Year C)",
  readingReference: "Sirach 35:12-14, 16-18 | 2 Timothy 4:6-8, 16-18 | Luke 18:9-14",
  scriptureText: "'For everyone who exalts himself will be humbled, but the one who humbles himself will be exalted.' — Luke 18:14",
  reflection: "The Pharisee in Jesus' parable stood by himself, listing his own righteousness and looking down on others. But the tax collector stood at a distance, would not even look up to heaven, and struck his breast saying: 'O God, be merciful to me, a sinner.' Real prayer begins with humility and sincere reliance on God's infinite grace. As parishioners of St. Michael, let our unity be rooted in deep humility, forgiving one another and welcoming every soul seeking Christ.",
  author: "Rev. Fr. Leonard Akuimbeni / Parish Pastoral Team"
};

export const initialWeeklyLiturgyAndSaints: DailyLiturgyAndSaint[] = [
  {
    id: "lit-sun",
    date: "2026-10-25",
    dayOfWeek: "Sunday",
    liturgicalTitle: "30th Sunday in Ordinary Time (Year C)",
    liturgicalColor: "Green",
    feastRank: "Solemnity",
    saintOrFeastName: "The Lord's Day & Saints Crispin and Crispinian",
    saintTitle: "Early Christian Martyrs & Shoemakers (c. 286)",
    saintBio: "Brothers from Rome who preached the Gospel in Gaul (modern France) while making shoes for the poor by night. Martyred under Maximian for refusing to sacrifice to pagan idols.",
    patronage: "Shoemakers, tanners, leather workers, weavers",
    firstReading: {
      reference: "Sirach 35:12-14, 16-18",
      excerpt: "The Lord is a God of justice, who knows no favorites. The prayer of the lowly pierces the clouds; it does not rest till it reaches its goal."
    },
    responsorialPsalm: {
      reference: "Psalm 34:2-3, 17-19, 23",
      refrain: "The Lord hears the cry of the poor.",
      verseExcerpt: "The Lord confronts the evildoers, to destroy remembrance of them from the earth. When the just cry out, the Lord hears them, and from all their distress he rescues them."
    },
    secondReading: {
      reference: "2 Timothy 4:6-8, 16-18",
      excerpt: "I am already being poured out like a libation, and the time of my departure is at hand. I have competed well; I have finished the race; I have kept the faith."
    },
    gospel: {
      reference: "Luke 18:9-14",
      keyVerse: "For whoever exalts himself will be humbled, and the one who humbles himself will be exalted.",
      excerpt: "Jesus addressed this parable to those who were convinced of their own righteousness and despised everyone else. 'Two people went up to the temple area to pray; one was a Pharisee and the other a tax collector... But the tax collector stood off at a distance and would not even raise his eyes to heaven but beat his breast and prayed, 'O God, be merciful to me a sinner.''"
    },
    reflectionTitle: "The Prayer That Pierces Heaven",
    reflectionText: "The Pharisee in Jesus' parable counted all his religious achievements before God, looking down on his neighbor. In contrast, the tax collector acknowledged his absolute dependence on God's unmerited mercy. True prayer begins where self-righteousness ends. In our families and basic Christian communities in Babessi, let us approach our Eucharistic Lord with contrite and humble spirits, recognizing that everything good in us is a fruit of His grace.",
    author: "Rev. Fr. Leonard Akuimbeni",
    dailyPrayer: "Almighty ever-living God, increase our faith, hope, and charity, and make us love what you command, so that we may merit what you promise. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen."
  },
  {
    id: "lit-mon",
    date: "2026-10-26",
    dayOfWeek: "Monday",
    liturgicalTitle: "Monday of the 30th Week in Ordinary Time",
    liturgicalColor: "Green",
    feastRank: "Ferial Day (Weekday)",
    saintOrFeastName: "St. Evaristus, Pope & Martyr",
    saintTitle: "Fifth Bishop of Rome (c. 97–107 AD)",
    saintBio: "Succeeded St. Clement as Pope during the reign of Emperor Trajan. Tradition attributes to him the division of Rome into distinct parish titles and the appointment of seven deacons to assist the clergy.",
    patronage: "Parish administrators and clergy",
    firstReading: {
      reference: "Ephesians 4:32—5:8",
      excerpt: "Be kind to one another, compassionate, forgiving one another as God has forgiven you in Christ. Be imitators of God, as beloved children, and live in love."
    },
    responsorialPsalm: {
      reference: "Psalm 1:1-4, 6",
      refrain: "Behave like God as his very dear children.",
      verseExcerpt: "Blessed the man who follows not the counsel of the wicked, but whose delight is in the law of the Lord and who meditates on his law day and night."
    },
    gospel: {
      reference: "Luke 13:10-17",
      keyVerse: "This daughter of Abraham, whom Satan has bound for eighteen years, ought she not to have been set free on the sabbath day?",
      excerpt: "Jesus was teaching in a synagogue on the sabbath. And a woman was there who for eighteen years had been crippled by a spirit; she was bent over, completely incapable of standing erect. When Jesus saw her, he called to her and said, 'Woman, you are set free of your infirmity.' He laid his hands on her, and she at once stood erect and glorified God."
    },
    reflectionTitle: "Unbinding the Burdened Heart",
    reflectionText: "The synagogue leader was indignant because healing took place on the Sabbath. But Christ revealed the true purpose of God's holy day: restoring human dignity and lifting the heavy burdens of the oppressed. Let us ask ourselves what habits or grudges bind our brothers and sisters today, and let us be Christ's instruments of liberty and healing.",
    author: "Rev. Fr. Leonard Akuimbeni",
    dailyPrayer: "O God, who gladden us with the heavenly protection of your saints, grant that as we follow their example of holiness, we may be freed from worldly shackles and walk in the fullness of your love. Through Christ our Lord. Amen."
  },
  {
    id: "lit-tue",
    date: "2026-10-27",
    dayOfWeek: "Tuesday",
    liturgicalTitle: "Tuesday of the 30th Week in Ordinary Time",
    liturgicalColor: "Green",
    feastRank: "Ferial Day (Weekday)",
    saintOrFeastName: "St. Frumentius, Bishop (Apostle to Ethiopia) & Blessed Bartholomew of Vicenza",
    saintTitle: "Fourth-century Missionary & Bishop",
    saintBio: "Shipwrecked on the coast of the Red Sea, Frumentius became a trusted court official and introduced the Christian faith to the Kingdom of Aksum. St. Athanasius of Alexandria consecrated him first Bishop of Ethiopia (known as Abba Selama, 'Father of Peace').",
    patronage: "African missions, Christian unity, catechists",
    firstReading: {
      reference: "Ephesians 5:21-33",
      excerpt: "Be subordinate to one another out of reverence for Christ. Husbands, love your wives, even as Christ loved the Church and handed himself over for her to sanctify her."
    },
    responsorialPsalm: {
      reference: "Psalm 128:1-5",
      refrain: "Blessed are those who fear the Lord.",
      verseExcerpt: "Blessed are all who fear the Lord, who walk in his ways! For you shall eat the fruit of your handiwork; blessed shall you be, and favored."
    },
    gospel: {
      reference: "Luke 13:18-21",
      keyVerse: "To what shall I compare the Kingdom of God? It is like a mustard seed that a man took and planted in the garden.",
      excerpt: "Jesus said, 'To what is the Kingdom of God like? It is like a mustard seed that a man took and planted in the garden. When it was fully grown, it became a large bush and the birds of the sky dwelt in its branches.' Again he said, 'To what shall I compare the Kingdom of God? It is like yeast that a woman took and mixed with three measures of wheat flour until the whole batch of dough was leavened.'"
    },
    reflectionTitle: "Small Seeds, Heavenly Harvest in Babessi",
    reflectionText: "The Kingdom of God does not arrive with thunderous political force. Like the tiny mustard seed or silent pinch of yeast, it transforms hearts quietly from within. Every small act of sacrifice, every rosary said in our family home, every lesson taught to our Sunday school children is sowing seeds that bear eternal fruit.",
    author: "Parish Pastoral Liturgy Team",
    dailyPrayer: "Lord God, who planted the seeds of your faith across the African continent through the apostolic zeal of Saint Frumentius, grant that our parish community of Babessi may continually grow like the mustard tree into a refuge of peace and charity for all. Amen."
  },
  {
    id: "lit-wed",
    date: "2026-10-28",
    dayOfWeek: "Wednesday",
    liturgicalTitle: "Feast of Saints Simon and Jude, Apostles",
    liturgicalColor: "Red",
    feastRank: "Feast",
    saintOrFeastName: "Saints Simon and Jude, Apostles & Martyrs",
    saintTitle: "Apostles of Jesus Christ (1st Century)",
    saintBio: "Simon the Zealot and Jude (Thaddaeus), brother of James the Less, preached the Gospel in Mesopotamia and Persia, sealing their testimony with martyrdom. St. Jude is universally invoked as the patron of desperate situations and cases despaired of.",
    patronage: "Hopeless causes, hospitals, difficult situations, lost items",
    firstReading: {
      reference: "Ephesians 2:19-22",
      excerpt: "You are no longer strangers and sojourners, but you are fellow citizens with the holy ones and members of the household of God, built upon the foundation of the Apostles and prophets, with Christ Jesus himself as the capstone."
    },
    responsorialPsalm: {
      reference: "Psalm 19:2-5",
      refrain: "Their message goes out through all the earth.",
      verseExcerpt: "The heavens declare the glory of God; the firmament proclaims his handiwork. Day pours out the word to day, and night to night imparts knowledge."
    },
    gospel: {
      reference: "Luke 6:12-16",
      keyVerse: "Jesus departed to the mountain to pray, and he spent the night in prayer to God. When day came, he called his disciples to himself, and from them he chose Twelve.",
      excerpt: "Jesus went up the mountain to pray, and he spent the night in prayer to God. When day came, he called his disciples to himself, and from them he chose Twelve, whom he also named Apostles: Simon, whom he named Peter, and his brother Andrew, James, John, Philip, Bartholomew, Matthew, Thomas, James the son of Alphaeus, Simon who was called a Zealot, and Jude the son of James, and Judas Iscariot, who became a traitor."
    },
    reflectionTitle: "Hope in Hopeless Causes: Grounded on the Apostles",
    reflectionText: "Before choosing His twelve apostles, Jesus spent the whole night in solitary prayer. St. Jude reminds us that when situations seem humanly impossible—whether in health, family peace, or spiritual trials—God's power is made perfect in weakness. Never lose hope; Christ is our foundation.",
    author: "Rev. Fr. Leonard Akuimbeni",
    dailyPrayer: "O God, who by the blessed Apostles have brought us to acknowledge your name, graciously grant, through the intercession of Saints Simon and Jude, that the Church may constantly grow by increase of the peoples who believe in you. Through Christ our Lord. Amen."
  },
  {
    id: "lit-thu",
    date: "2026-10-29",
    dayOfWeek: "Thursday",
    liturgicalTitle: "Thursday of the 30th Week in Ordinary Time",
    liturgicalColor: "Green",
    feastRank: "Ferial Day (Weekday)",
    saintOrFeastName: "St. Narcissus of Jerusalem, Bishop",
    saintTitle: "Patriarch of Jerusalem (c. 99–216 AD)",
    saintBio: "A bishop of great holiness who governed the Church of Jerusalem well into his second century of life. Celebrated for turning water into lamp oil when fuel ran out at the Easter Vigil, and renowned for patient endurance when falsely accused.",
    patronage: "Those suffering false accusations, elderly bishops, longevity",
    firstReading: {
      reference: "Ephesians 6:10-20",
      excerpt: "Draw your strength from the Lord and from his mighty power. Put on the armor of God so that you may be able to stand firm against the tactics of the devil. Take the helmet of salvation and the sword of the Spirit, which is the word of God."
    },
    responsorialPsalm: {
      reference: "Psalm 144:1-2, 9-10",
      refrain: "Blessed be the Lord, my Rock!",
      verseExcerpt: "Blessed be the Lord, my rock, who trains my arms for battle, my fingers for war. My mercy and my fortress, my stronghold, my deliverer, my shield, in whom I trust."
    },
    gospel: {
      reference: "Luke 13:31-35",
      keyVerse: "Jerusalem, Jerusalem, you who kill the prophets and stone those sent to you, how often have I desired to gather your children together as a hen gathers her brood under her wings!",
      excerpt: "Some Pharisees came to Jesus and said, 'Go away, leave this area because Herod wants to kill you.' He replied, 'Go and tell that fox, 'Behold, I cast out demons and I perform healings today and tomorrow, and on the third day I accomplish my purpose.' Yet I must continue on my way today, tomorrow, and the following day... O Jerusalem, Jerusalem... how many times I yearned to gather your children together!'"
    },
    reflectionTitle: "The Armor of God & the Loving Wings of Christ",
    reflectionText: "St. Paul uses military imagery not to promote worldly violence, but to call us to spiritual vigilance. Truth, righteousness, the Gospel of peace, and faith are our armor. And under the protective wings of Christ, our parish finds sanctuary against all spiritual warfare.",
    author: "Rev. Fr. Leonard Akuimbeni",
    dailyPrayer: "Saint Michael the Archangel, defend us in battle. Be our defense against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the heavenly host, by the power of God, cast into hell Satan and all the evil spirits who prowl through the world seeking the ruin of souls. Amen."
  },
  {
    id: "lit-fri",
    date: "2026-10-30",
    dayOfWeek: "Friday",
    liturgicalTitle: "Friday of the 30th Week in Ordinary Time",
    liturgicalColor: "Green",
    feastRank: "Ferial Day (Weekday)",
    saintOrFeastName: "St. Alphonsus Rodriguez & St. Gerard of Lunel",
    saintTitle: "Humble Jesuit Lay Brother & Mystic (1532–1617)",
    saintBio: "After losing his wife and children to illness, Alphonsus entered the Society of Jesus as a lay brother. For 46 years he served as the doorkeeper at the Jesuit College in Majorca. Every time the doorbell rang, he would say 'I am coming, Lord!' seeing Christ in every visitor.",
    patronage: "Doorkeepers, hotel concierges, lay brothers, grief recovery",
    firstReading: {
      reference: "Philippians 1:1-11",
      excerpt: "I am confident of this, that the one who began a good work in you will continue to complete it until the day of Christ Jesus. God is my witness, how I long for all of you with the affection of Christ Jesus."
    },
    responsorialPsalm: {
      reference: "Psalm 111:1-6",
      refrain: "Great are the works of the Lord.",
      verseExcerpt: "I will give thanks to the Lord with all my heart in the company and assembly of the just. Great are the works of the Lord, exquisite in all their delights."
    },
    gospel: {
      reference: "Luke 14:1-6",
      keyVerse: "Who among you, if your son or ox falls into a cistern, would not immediately pull him out on the sabbath day?",
      excerpt: "On a sabbath Jesus went to dine at the home of one of the leading Pharisees, and the people there were observing him carefully. In front of him there was a man suffering from dropsy. Jesus spoke to the scholars of the law and Pharisees in reply, asking, 'Is it lawful to cure on the sabbath or not?' But they kept silent; so he took the man and, after the healing, dismissed him."
    },
    reflectionTitle: "Holiness in the Doorknob of Life",
    reflectionText: "St. Alphonsus Rodriguez taught us that sanctification does not require extraordinary positions. By opening the front door with the pure intention of welcoming Jesus Christ in every guest, he reached the heights of contemplation. May our parish hospitality in Babessi reflect this same joyful reverence for every soul that crosses our threshold.",
    author: "Rev. Fr. Leonard Akuimbeni",
    dailyPrayer: "Lord Jesus, give us hearts that see You in the poor, the visitor, and the lonely. Let our daily duties, however humble, be offered as sweet sacrifices of praise to Your holy name. Amen."
  },
  {
    id: "lit-sat",
    date: "2026-10-31",
    dayOfWeek: "Saturday",
    liturgicalTitle: "Saturday Memorial of the Blessed Virgin Mary",
    liturgicalColor: "White",
    feastRank: "Memorial",
    saintOrFeastName: "Blessed Virgin Mary on Saturday & St. Wolfgang of Regensburg",
    saintTitle: "Mother of the Church & Bishop-Missionary",
    saintBio: "Catholic tradition dedicates Saturday to the Blessed Virgin Mary, meditating on her steadfast faith on Holy Saturday when all others wavered. St. Wolfgang (c. 924–994) was a Benedictine reformer and bishop renowned for charity to the destitute.",
    patronage: "The Universal Church, woodcarvers, stomach ailments",
    firstReading: {
      reference: "Philippians 1:18b-26",
      excerpt: "Christ will be magnified in my body, whether by life or by death. For to me life is Christ, and death is gain. If I go on living in the flesh, that means fruitful labor for me."
    },
    responsorialPsalm: {
      reference: "Psalm 42:2-3, 5",
      refrain: "My soul is thirsting for the living God.",
      verseExcerpt: "As the deer longs for streams of water, so my soul longs for you, O God. My soul thirsts for God, the living God. When can I enter and see the face of God?"
    },
    gospel: {
      reference: "Luke 14:1, 7-11",
      keyVerse: "For everyone who exalts himself will be humbled, but the one who humbles himself will be exalted.",
      excerpt: "On a sabbath Jesus went to dine at the home of one of the leading Pharisees. He told a parable to those who had been invited, noticing how they were choosing the places of honor at the table. 'When you are invited by someone to a wedding banquet, do not recline at table in the place of honor... But go and take the lowest place...'"
    },
    reflectionTitle: "Under the Mantle of Our Lady",
    reflectionText: "On the eve of the Solemnity of All Saints, we turn our gaze to Our Lady, Queen of All Saints. Her Magnificat proclaims that God has cast down the mighty from their thrones and lifted up the lowly. Let us prepare our hearts for Sunday worship by imitating Mary's quiet, receptive faith.",
    author: "Rev. Fr. Leonard Akuimbeni",
    dailyPrayer: "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession was left unaided. Inspired by this confidence, we fly unto thee, O Virgin of virgins, our Mother. Amen."
  }
];

export const initialAdminUsers: import('../types').AdminUser[] = [
  {
    id: "usr-1",
    name: "Rev. Fr. Leonard Akuimbeni",
    email: "priest@stmichaelbabessi.org",
    role: "SUPER_ADMIN",
    title: "Parish Priest & Spiritual Director",
    isActive: true,
    lastLoginAt: "2026-10-22T10:15:00Z",
    createdAt: "2026-01-01"
  },
  {
    id: "usr-2",
    name: "Mme. Parish Secretary",
    email: "secretary@stmichaelbabessi.org",
    role: "CONTENT_EDITOR",
    title: "Secretariat & Communications Officer",
    isActive: true,
    lastLoginAt: "2026-10-22T08:30:00Z",
    createdAt: "2026-01-15"
  },
  {
    id: "usr-3",
    name: "Mr. Emmanuel Ndifor",
    email: "finance@stmichaelbabessi.org",
    role: "FINANCE_OFFICER",
    title: "Parish Finance Council Treasurer",
    isActive: true,
    lastLoginAt: "2026-10-21T16:45:00Z",
    createdAt: "2026-02-01"
  },
  {
    id: "usr-4",
    name: "Pa Joseph Voma",
    email: "liturgy@stmichaelbabessi.org",
    role: "LITURGY_COORDINATOR",
    title: "Chief Catechist & Liturgical Lead",
    isActive: true,
    lastLoginAt: "2026-10-20T11:00:00Z",
    createdAt: "2026-02-10"
  }
];

export const initialTransactions: import('../types').DonationTransaction[] = [
  {
    id: "txn-1",
    reference: "MOMO-2026-0891",
    projectId: "proj-1",
    projectTitle: "Church Hall Rehabilitation & Roofing Project",
    donorName: "Stephen Nkwenti",
    donorEmail: "stephen.nkwenti@gmail.com",
    donorPhone: "+237 677 123 456",
    amountXAF: 25000,
    frequency: "one-time",
    gateway: "MTN Mobile Money",
    status: "completed",
    intention: "Thanksgiving for safe travel and family blessings",
    isAnonymous: false,
    createdAt: "2026-10-18T14:22:00Z",
    receiptNumber: "REC-2026-0042",
    paymentDetails: {
      phoneNumber: "+237 677 123 456",
      ussdRef: "MTN-REF-78931"
    }
  },
  {
    id: "txn-2",
    reference: "STRIPE-2026-0892",
    projectId: "proj-2",
    projectTitle: "Borehole & Clean Water for Parish Community & Dispensary",
    donorName: "Dr. Catherine Bih (Diaspora - UK)",
    donorEmail: "catherine.bih@health.co.uk",
    donorPhone: "+44 7911 123456",
    amountXAF: 50000,
    frequency: "monthly",
    gateway: "Stripe (Cards)",
    status: "completed",
    intention: "For the health of my mother in Babessi and parish children",
    isAnonymous: false,
    createdAt: "2026-10-19T09:15:00Z",
    receiptNumber: "REC-2026-0043",
    paymentDetails: {
      cardLast4: "4242",
      cardBrand: "Visa"
    }
  },
  {
    id: "txn-3",
    reference: "OM-2026-0893",
    projectId: "proj-3",
    projectTitle: "Sacred Liturgical Vestments & Altar Vessels Fund",
    donorName: "Marie Lum",
    donorEmail: "marie.lum@yahoo.com",
    donorPhone: "+237 699 987 654",
    amountXAF: 15000,
    frequency: "one-time",
    gateway: "Orange Money",
    status: "completed",
    intention: "In memory of deceased grandparents",
    isAnonymous: false,
    createdAt: "2026-10-20T11:40:00Z",
    receiptNumber: "REC-2026-0044",
    paymentDetails: {
      phoneNumber: "+237 699 987 654",
      ussdRef: "OM-REF-44219"
    }
  },
  {
    id: "txn-4",
    reference: "PP-2026-0894",
    projectId: "proj-4",
    projectTitle: "Educational Scholarships for Needy Parish Children",
    donorName: "Anthony Fru (Diaspora - USA)",
    donorEmail: "anthony.fru@global.org",
    donorPhone: "+1 415 555 2671",
    amountXAF: 30000,
    frequency: "quarterly",
    gateway: "PayPal",
    status: "completed",
    intention: "For children without school fees to continue Catholic education",
    isAnonymous: false,
    createdAt: "2026-10-21T17:05:00Z",
    receiptNumber: "REC-2026-0045",
    paymentDetails: {
      paypalEmail: "anthony.fru@global.org"
    }
  }
];

