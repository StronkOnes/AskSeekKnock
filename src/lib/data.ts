import type { JournalEntry, PrayerTemplate, SermonNote, ScheduledPrayer, BlogEntry } from './types';

export const prayerTemplates: PrayerTemplate[] = [
  {
    id: 'template-1',
    title: 'Everyday Prayer Session',
    description: 'A 60-minute itemized prayer session.',
    icon: 'Sun',
    points: [
        { title: 'PREAMBLE: 1 Thessalonians 5: 16-18', duration: 1, text: 'Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus.' },
        { title: 'FELLOWSHIP – Opening: Matthew 6: 9-13', duration: 2, text: '“This, then, is how you should pray: “ ‘Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven. Give us today our daily bread.  And forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from the evil one.' },
        { title: 'FELLOWSHIP - Repentance: Psalm 51', duration: 2, text: 'Recite and declare your repentance. Name the sins you are aware of (sins of commission) and ask God forgive you for the sins you are unaware of (sins of ommission).' },
        { title: 'FELLOWSHIP – Forgiveness: Mark 11: 25', duration: 1, text: 'And when you stand praying, if you hold anything against anyone, forgive them, so that your Father in heaven may forgive you your sins.' },
        { title: 'FELLOWSHIP – Agreement: Matthew 18: 19-20', duration: 1, text: '“Again, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven. For where two or three gather in my name, there am I with them.”' },
        { title: 'FELLOWSHIP – Commitment: Habakkuk 2: 1', duration: 1, text: 'I will stand at my watch and station myself on the ramparts; I will look to see what he will say to me, and what answer I am to give to this complaint.' },
        { title: 'PRAISE & WORSHIP: Psalm 100: 4', duration: 2, text: 'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.' },
        { title: 'PRAISE & WORSHIP: Colossians 2: 13-15', duration: 2, text: 'When you were dead in your sins and in the uncircumcision of your flesh, God made you alive with Christ. He forgave us all our sins, having canceled the charge of our legal indebtedness, which stood against us and condemned us; he has taken it away, nailing it to the cross. And having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them by the cross.' },
        { title: 'PRAISE & WORSHIP: John 14: 26', duration: 2, text: 'But the Comforter (Counselor, Helper, Intercessor, Advocate, Strengthener, Standby), the Holy Spirit, Whom the Father will send in My name [in My place, to represent Me and act on My behalf], He will teach you all things. And He will cause you to recall (will remind you of, bring to your remembrance) everything I have told you. [AMPC]' },
        { title: 'PRAISE & WORSHIP: 2 Corinthians 13: 14', duration: 1, text: 'May the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all.' },
        { title: 'PRAISE & WORSHIP: Luke 10: 19', duration: 1, text: 'I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.' },
        { title: 'FAITH: Matthew 4: 4', duration: 2, text: 'Jesus answered, “It is written: ‘Man shall not live on bread alone, but on every word that comes from the mouth of God.’”' },
        { title: 'FAITH: Matthew 22: 37-38 & John 14: 15', duration: 2, text: 'Jesus replied: “ ‘Love the Lord your God with all your heart and with all your soul and with all your mind.’ This is the first and greatest commandment.\n&\n“If you love me, keep my commands.' },
        { title: 'FAITH: John 15: 4', duration: 2, text: 'Remain in me, as I also remain in you. No branch can bear fruit by itself; it must remain in the vine. Neither can you bear fruit unless you remain in me.' },
        { title: 'FAITH: James 1: 22-25', duration: 2, text: 'But be ye doers of the word, and not hearers only, deceiving your own selves. For if any be a hearer of the word, and not a doer, he is like unto a man beholding his natural face in a glass: for he beholdeth himself, and goeth his way, and straightway forgetteth what manner of man he was. But whoso looketh into the perfect law of liberty, and continueth therein, he being not a forgetful hearer, but a doer of the work, this man shall be blessed in his deed. [KJV]' },
        { title: 'FAITH: James 1: 2-4', duration: 2, text: 'My brethren, count it all joy when ye fall into divers temptations; knowing this, that the trying of your faith worketh patience. But let patience have her perfect work, that ye may be perfect and entire, wanting nothing. [KJV]' },
        { title: 'HEALTH: 1 Peter 2: 24', duration: 2, text: '“He himself bore our sins” in his body on the cross, so that we might die to sins and live for righteousness; “by his wounds you have been healed.”' },
        { title: 'HEALTH: Acts 9: 34', duration: 1, text: '“Aeneas,” Peter said to him, “Jesus Christ heals you. Get up and roll up your mat.” Immediately Aeneas got up.' },
        { title: 'HEALTH: Mark 16: 17', duration: 2, text: 'And these signs will accompany those who believe: In my name they will drive out demons; they will speak in new tongues;' },
        { title: 'HEALTH: Psalm 103: 2-5', duration: 2, text: 'Praise the Lord, my soul, and forget not all his benefits— who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion, who satisfies your desires with good things so that your youth is renewed like the eagle’s.' },
        { title: 'RELATIONSHIPS – Spiritual Parents: 1 Thessalonians 5: 12-13', duration: 1, text: 'Now we ask you, brothers and sisters, to acknowledge those who work hard among you, who care for you in the Lord and who admonish you. Hold them in the highest regard in love because of their work. Live in peace with each other.' },
        { title: 'RELATIONSHIPS – Parents: Ephesians 6: 13', duration: 1, text: 'Children, obey your parents in the Lord, for this is right. “Honor your father and mother”—which is the first commandment with a promise— “so that it may go well with you and that you may enjoy long life on the earth.”' },
        { title: 'RELATIONSHIPS – Spouse: Ephesians 5: 22 & 25', duration: 1, text: 'Wives, submit yourselves to your own husbands as you do to the Lord.\n&\nHusbands, love your wives, just as Christ loved the church and gave himself up for her.' },
        { title: 'RELATIONSHIPS – Children: Deuteronomy 5: 29', duration: 1, text: 'Oh, that their hearts would be inclined to fear me and keep all my commands always, so that it might go well with them and their children forever!' },
        { title: 'RELATIONSHIPS – Church Family: Romans 12: 9-10', duration: 1, text: 'Love must be sincere. Hate what is evil; cling to what is good. Be devoted to one another in love. Honor one another above yourselves.' },
        { title: 'FINANCE – Covenant: Deuteronomy 8: 18', duration: 1, text: 'But remember the Lord your God, for it is he who gives you the ability to produce wealth, and so confirms his covenant, which he swore to your ancestors, as it is today.' },
        { title: 'FINANCE – Employment: Ephesians 4: 28', duration: 1, text: 'Anyone who has been stealing must steal no longer, but must work, doing something useful with their own hands, that they may have something to share with those in need.' },
        { title: 'FINANCE – Firstfruit & Tithe: Proverbs 3: 9-10 & Malachi 3: 10', duration: 2, text: 'Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.\n&\nBring the whole tithe into the storehouse, that there may be food in my house. Test me in this,” says the Lord Almighty, “and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.' },
        { title: 'FINANCE – Sowing & Offering: 2 Corinthians 9: 6 & 10', duration: 2, text: 'Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.\n&\nNow he who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness.' },
        { title: 'FINANCE – Business: Psalm 90: 17', duration: 1, text: 'May the favor of the Lord our God rest on us; establish the work of our hands for us— yes, establish the work of our hands.' },
        { title: 'WITCHCRAFT: Luke 12: 2-3', duration: 2, text: 'There is nothing concealed that will not be disclosed, or hidden that will not be made known. What you have said in the dark will be heard in the daylight, and what you have whispered in the ear in the inner rooms will be proclaimed from the roofs.' },
        { title: 'WITCHCRAFT: Matthew 16: 19', duration: 2, text: 'I will give you the keys of the kingdom of heaven; whatever you bind on earth will be bound in heaven, and whatever you loose on earth will be loosed in heaven.”' },
        { title: 'WITCHCRAFT: Isaiah 54: 17', duration: 2, text: 'No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the Lord, and this is their vindication from me,” declares the Lord.' },
        { title: 'WITCHCRAFT: Luke 10: 18-19', duration: 2, text: 'He replied, “I saw Satan fall like lightning from heaven. I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.' },
        { title: 'WITCHCRAFT: Exodus 22: 18 & Genesis 12: 3', duration: 2, text: 'Do not allow a sorceress to live.\n&\nI will bless those who bless you, and whoever curses you I will curse; and all peoples on earth will be blessed through you.”' },
        { title: 'DECLARATIONS – Faith: 2 Corinthians 5: 17', duration: 1, text: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!' },
        { title: 'DECLARATIONS – Health: 1 Peter 2: 24', duration: 1, text: '“He himself bore our sins” in his body on the cross, so that we might die to sins and live for righteousness; “by his wounds you have been healed.”' },
        { title: 'DECLARATIONS – Relationships: Colossians 1: 29', duration: 1, text: 'To this end I strenuously contend with all the energy Christ so powerfully works in me.' },
        { title: 'DECLARATIONS – Finance: 2 Corinthians 8: 9', duration: 1, text: 'For you know the grace of our Lord Jesus Christ, that though he was rich, yet for your sake he became poor, so that you through his poverty might become rich.' },
        { title: 'DECLARATIONS – Witchcraft: Colossians 2: 15', duration: 1, text: 'And having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them by the cross.' },
        { title: 'THANKSGIVING CONFESSION: Mark 11: 24', duration: 1, text: 'Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.' },
    ],
  },
  {
    id: 'template-2',
    title: 'Witchcraft',
    description: 'One Hour Itemized Prayer Session',
    icon: 'Shield',
    points: [
        { title: 'PREAMBLE: Ephesians 6: 10-12', duration: 5, text: 'Finally, be strong in the Lord and in his mighty power. Put on the full armor of God, so that you can take your stand against the devil’s schemes. For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms.' },
        { title: 'WARFARE: Psalm 35: 1-3', duration: 5, text: 'Contend, Lord, with those who contend with me; fight against those who fight against me. Take up shield and armor; arise and come to my aid. Brandish spear and javelin against those who pursue me. Say to me, “I am your salvation.”' },
        { title: 'WARFARE: Luke 10: 19', duration: 5, text: 'I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.' },
        { title: 'WARFARE: Luke 12: 3', duration: 5, text: 'There is nothing concealed that will not be disclosed, or hidden that will not be made known. What you have said in the dark will be heard in the daylight, and what you have whispered in the ear in the inner rooms will be proclaimed from the roofs.' },
        { title: 'WARFARE: Matthew 16: 19', duration: 5, text: 'I will give you the keys of the kingdom of heaven; and whatever you bind (declare to be improper and unlawful) on earth must be what is already bound in heaven; and whatever you loose (declare lawful) on earth must be what is already loosed in heaven. [AMPC]' },
        { title: 'WARFARE: Matthew 18: 18', duration: 5, text: 'Truly I tell you, whatever you bind on earth will be bound in heaven, and whatever you loose on earth will be loosed in heaven.' },
        { title: 'WARFARE: Psalm 91: 11-13', duration: 5, text: 'For he will command his angels concerning you to guard you in all your ways; they will lift you up in their hands, so that you will not strike your foot against a stone. You will tread on the lion and the cobra; you will trample the great lion and the serpent.' },
        { title: 'WARFARE: Deuteronomy 12: 2-3', duration: 5, text: 'Destroy completely all the places on the high mountains, on the hills and under every spreading tree, where the nations you are dispossessing worship their gods. Break down their altars, smash their sacred stones and burn their Asherah poles in the fire; cut down the idols of their gods and wipe out their names from those places.' },
        { title: 'WARFARE: Matthew 12: 29 & Numbers 23: 23', duration: 5, text: 'Or again, how can anyone enter a strong man’s house and carry off his possessions unless he first ties up the strong man? Then he can plunder his house.\n&\nThere is no divination against Jacob, no evil omens against Israel. It will now be said of Jacob and of Israel, ‘See what God has done!' },
        { title: 'WARFARE: Psalm 35: 5-6 & 26', duration: 5, text: 'May they be like chaff before the wind, with the angel of the Lord driving them away; may their path be dark and slippery, with the angel of the Lord pursuing them.\n&\nMay all who gloat over my distress be put to shame and confusion; may all who exalt themselves over me be clothed with shame and disgrace.' },
        { title: 'WARFARE: Luke 10: 18-19', duration: 5, text: 'He replied, “I saw Satan fall like lightning from heaven. I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.' },
        { title: 'WARFARE: Exodus 22: 18 & Genesis 12: 3', duration: 5, text: 'Thou shalt not suffer a witch to live.\n&\nI will bless those who bless you, and whoever curses you I will curse; and all peoples on earth will be blessed through you.”' },
        { title: 'WARFARE: Colossians 2: 15 & Corinthians 2: 14', duration: 5, text: 'And having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them by the cross.\n&\nBut thanks be to God, who always leads us as captives in Christ’s triumphal procession and uses us to spread the aroma of the knowledge of him everywhere.' },
        { title: 'THANKSGIVING CONFESSION: Exodus 14: 13-14', duration: 5, text: 'Moses answered the people, “Do not be afraid. Stand firm and you will see the deliverance the Lord will bring you today. The Egyptians you see today you will never see again. The Lord will fight for you; you need only to be still.”' },
    ],
  },
  {
    id: 'template-3',
    title: 'Prayers for Restoration',
    description: 'One Hour Itemized Prayer Session',
    icon: 'Heart',
    points: [
        { title: 'PREAMBLE: Psalm 103: 1-5', duration: 5, text: 'Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord, my soul, and forget not all his benefits—who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion, who satisfies your desires with good things so that your youth is renewed like the eagle’s.' },
        { title: 'PRAISE & WORSHIP: Psalm 100: 4-5', duration: 5, text: 'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name. For the Lord is good and his love endures forever; his faithfulness continues through all generations.' },
        { title: 'PETITION: Joel 2: 25-27', duration: 5, text: '“I will repay you for the years the locusts have eaten— the great locust and the young locust, the other locusts and the locust swarm— my great army that I sent among you. You will have plenty to eat, until you are full, and you will praise the name of the Lord your God, who has worked wonders for you; never again will my people be shamed. Then you will know that I am in Israel, that I am the Lord your God, and that there is no other; never again will my people be shamed.' },
        { title: 'PETITION: Matthew 7: 7-8', duration: 5, text: '“Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened.' },
        { title: 'PETITION: Psalm 126: 4-6', duration: 5, text: 'Restore our fortunes, Lord, like streams in the Negev. Those who sow with tears will reap with songs of joy. Those who go out weeping, carrying seed to sow, will return with songs of joy, carrying sheaves with them.' },
        { title: 'PETITION: Psalm 23: 5-6', duration: 5, text: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows. Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.' },
        { title: 'PETITION: Genesis 12: 2-3', duration: 5, text: '“I will make you into a great nation, and I will bless you; I will make your name great, and you will be a blessing. I will bless those who bless you, and whoever curses you I will curse; and all peoples on earth will be blessed through you.”' },
        { title: 'PETITION: Ezekiel 16: 14 & Isaiah 62: 3', duration: 5, text: 'And your fame spread among the nations on account of your beauty, because the splendor I had given you made your beauty perfect, declares the Sovereign Lord.\n&\nYou will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.' },
        { title: 'PETITION: Deuteronomy 28: 12-13', duration: 5, text: 'The Lord will open the heavens, the storehouse of his bounty, to send rain on your land in season and to bless all the work of your hands. You will lend to many nations but will borrow from none. The Lord will make you the head, not the tail. If you pay attention to the commands of the Lord your God that I give you this day and carefully follow them, you will always be at the top, never at the bottom.' },
        { title: 'PROPHETIC DECLARATION: Ezekiel 37: 4-6', duration: 5, text: 'Then he said to me, “Prophesy to these bones and say to them, ‘Dry bones, hear the word of the Lord! This is what the Sovereign Lord says to these bones: I will make breath enter you, and you will come to life. I will attach tendons to you and make flesh come upon you and cover you with skin; I will put breath in you, and you will come to life. Then you will know that I am the Lord.’”' },
        { title: 'PROPHETIC DECLARATION: Ezekiel 37: 9', duration: 5, text: 'Then he said to me, “Prophesy to the breath; prophesy, son of man, and say to it, ‘This is what the Sovereign Lord says: Come, breath, from the four winds and breathe into these slain, that they may live.’”' },
        { title: 'PROPHETIC DECLARATION: John 11: 43-44', duration: 5, text: 'When he had said this, Jesus called in a loud voice, “Lazarus, come out!” The dead man came out, his hands and feet wrapped with strips of linen, and a cloth around his face. Jesus said to them, “Take off the grave clothes and let him go.”' },
        { title: 'PROPHETIC DECLARATION: Proverbs 4: 18 & Isaiah 60: 1', duration: 5, text: 'The path of the righteous is like the morning sun, shining ever brighter till the full light of day.\n&\n“Arise, shine, for your light has come, and the glory of the Lord rises upon you.' },
        { title: 'THANKSGIVING CONFESSION: Psalm 25: 3 & Ephesians 3: 20-21', duration: 5, text: 'No one who hopes in you will ever be put to shame, but shame will come on those who are treacherous without cause.\n&\nNow to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us, to him be glory in the church and in Christ Jesus throughout all generations, for ever and ever! Amen.' },
    ],
  },
   {
    id: 'template-4',
    title: 'Guidance and Wisdom',
    description: 'Seek direction for your life.',
    icon: 'Users', // using Users as a stand-in for a guidance icon
    points: [
      { title: 'Pray for Clarity', duration: 4 },
      { title: 'Listen for Guidance', duration: 5 },
      { title: 'Pray for Wise Decisions', duration: 3 },
    ],
  },
];

export const communityPrayerTemplates: PrayerTemplate[] = [
    {
      id: 'community-template-1',
      title: 'Prayer for Strength',
      description: 'A template for finding strength in difficult times, created by User A.',
      icon: 'Shield',
      points: [
        { title: 'Acknowledge Weakness', duration: 3 },
        { title: 'Seek Divine Strength', duration: 5 },
        { title: 'Pray for Endurance', duration: 4 },
        { title: 'Give Thanks for Support', duration: 2 },
      ],
    },
    {
      id: 'community-template-2',
      title: 'Finding Your Purpose',
      description: 'A prayer guide for those seeking their calling, by User B.',
      icon: 'Star',
      points: [
        { title: 'Quiet the Mind', duration: 5 },
        { title: 'Ask for a Vision', duration: 5 },
        { title: 'Pray for Open Doors', duration: 5 },
      ],
    },
     {
      id: 'community-template-3',
      title: 'Serving Others',
      description: 'A prayer focused on having a servant\'s heart, by User C.',
      icon: 'HandHelping',
      points: [
        { title: 'Pray for Humility', duration: 4 },
        { title: 'Ask for Opportunities to Serve', duration: 4 },
        { title: 'Pray for Those You Serve', duration: 6 },
      ],
    },
  ];

export const personalPrayerTemplates: PrayerTemplate[] = [
  {
    id: 'personal-template-1',
    title: 'My Daily Check-in',
    description: 'A personal template for my daily prayer time.',
    icon: 'UserSquare',
    points: [
      { title: 'Center my thoughts', duration: 2 },
      { title: 'Pray about my tasks', duration: 5 },
      { title: 'Lift up my personal requests', duration: 5 },
    ],
  }
];

export const journalEntries: JournalEntry[] = [
  {
    id: 'entry-1',
    category: 'Reflections',
    timestamp: new Date('2024-07-20T10:00:00').getTime(),
    content: 'Today I felt a deep sense of peace during my morning prayer. I am thankful for the quiet moments before the day begins.',
  },
  {
    id: 'entry-2',
    category: 'Reflections',
    timestamp: new Date('2024-07-19T09:00:00').getTime(),
    content: 'I prayed for my family today. There are so many things on my heart for them. I feel lighter after lifting them up in prayer.',
  },
  {
    id: 'entry-3',
    category: 'Dreams',
    timestamp: new Date('2024-07-18T23:00:00').getTime(),
    content: 'Had a vivid dream about walking through a forest. It felt significant, but the meaning is still unclear.',
  },
  {
    id: 'entry-4',
    category: 'Revelations',
    timestamp: new Date('2024-07-17T14:00:00').getTime(),
    content: 'The phrase "Be still" kept coming to mind during my reflection. A reminder to trust and wait.',
  },
];


export const prayerActivityData = [
  { name: 'Mon', total: Math.floor(Math.random() * 30) + 5 },
  { name: 'Tue', total: Math.floor(Math.random() * 30) + 5 },
  { name: 'Wed', total: Math.floor(Math.random() * 30) + 5 },
  { name: 'Thu', total: Math.floor(Math.random() * 30) + 5 },
  { name: 'Fri', total: Math.floor(Math.random() * 30) + 5 },
  { name: 'Sat', total: Math.floor(Math.random() * 30) + 5 },
  { name: 'Sun', total: Math.floor(Math.random() * 30) + 5 },
];

export const sermonNotes: SermonNote[] = [
    {
      id: 'sermon-1',
      title: 'The Good Shepherd',
      topic: 'Faith',
      timestamp: new Date('2024-07-21T11:00:00').getTime(),
      content: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures...',
    },
    {
      id: 'sermon-2',
      title: 'Sermon on the Mount',
      topic: 'Love',
      timestamp: new Date('2024-07-14T11:00:00').getTime(),
      content: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they will be comforted.',
    },
];

export const scheduledPrayers: ScheduledPrayer[] = [
  {
    id: 'sched-1',
    title: 'Weekly Prayer Group',
    timestamp: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).getTime(), // 2 days from now
    notes: 'We will be praying for the community and for personal requests.',
    participants: ['User A', 'User B', 'You'],
    type: 'weekly group',
  },
  {
    id: 'sched-2',
    title: 'Morning Devotion',
    timestamp: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).getTime(), // 1 day from now
    participants: ['You'],
    type: 'morning devotion',
  }
];

export const blogEntries: BlogEntry[] = [
  {
    id: '1',
    title: 'The Power of Consistency in Prayer',
    slug: 'power-of-consistency',
    author: 'A.S.K. Author',
    date: 'March 25, 2026',
    category: 'Prayer Fundamentals',
    excerpt: 'Consistency is the engine that drives spiritual growth. In this section, we explore why daily commitment is vital.',
    content: `
      <h2>The Engine of Spiritual Growth</h2>
      <p>Consistency is more than just a habit; it's a spiritual discipline that opens doors to deeper communion with God. When we pray daily, we aren't just ticking a box; we are building a relationship.</p>
      <h3>Why Daily Prayer?</h3>
      <p>Imagine trying to grow a garden by watering it only once a month. The plants might survive, but they won't thrive. Our spiritual lives are much the same. Daily prayer provides the "water" our souls need to remain vibrant and strong.</p>
      <blockquote>"Pray without ceasing." — 1 Thessalonians 5:17</blockquote>
      <p>This book section dives into the itemized approach to prayer, helping you structure your sessions so that they remain fresh, focused, and powerful every single day.</p>
    `,
    image: 'https://images.unsplash.com/photo-1507502707541-f369a3b18502?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Understanding Spiritual Warfare',
    slug: 'understanding-spiritual-warfare',
    author: 'A.S.K. Author',
    date: 'March 28, 2026',
    category: 'Warfare Insights',
    excerpt: 'Spiritual warfare is a reality for every believer. Learn how to wield the authority given to you in Christ.',
    content: `
      <h2>Equipped for Battle</h2>
      <p>The Bible tells us that our struggle is not against flesh and blood, but against spiritual forces of evil. Understanding this is the first step toward victory.</p>
      <h3>Wielding Your Authority</h3>
      <p>In the name of Jesus Christ, every believer has been given authority to overcome the power of the enemy. This isn't something we earn; it's something we inherit as children of God.</p>
      <p>As we discuss in the "Witchcraft" prayer template, recognizing the schemes of the enemy allows us to pray with precision and power. This section of the book explores the biblical basis for our authority and how to exercise it effectively.</p>
    `,
    image: 'https://images.unsplash.com/photo-1461397821064-32d6b3c91b9f?auto=format&fit=crop&q=80&w=800',
  }
];
