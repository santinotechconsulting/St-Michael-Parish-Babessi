import {
  ParishInfo,
  MassSchedule,
  SacramentInfo,
  MinistryGroup,
  Announcement,
  ParishEvent,
  SupportProject,
  GalleryItem,
  ScriptureReflection
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
  author: "Parish Priest / Pastoral Liturgy Team"
};

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

