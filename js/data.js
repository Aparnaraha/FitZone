// Mock data for the fitness platform
const mockData = {
  classes: [
    {
      id: 1,
      name: "High-Intensity Interval Training",
      type: "cardio",
      difficulty: "intermediate",
      trainer: "Sarah Johnson",
      trainerId: 1,
      duration: 45,
      capacity: 20,
      description:
        "Burn calories and improve cardiovascular fitness with this intense workout combining short bursts of high-intensity exercises with brief recovery periods.",
      image:
        "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400",
      schedule: [
        { day: "Monday", time: "09:00 AM" },
        { day: "Wednesday", time: "06:00 PM" },
        { day: "Friday", time: "07:00 AM" },
      ],
      price: 25,
      rating: 4.8,
      enrolled: 18,
    },
    {
      id: 2,
      name: "Vinyasa Flow Yoga",
      type: "yoga",
      difficulty: "beginner",
      trainer: "Emma Davis",
      trainerId: 2,
      duration: 60,
      capacity: 15,
      description:
        "Flow through a series of poses that will help you build strength, flexibility, and inner peace. Perfect for beginners.",
      image:
        "https://images.pexels.com/photos/3984340/pexels-photo-3984340.jpeg?auto=compress&cs=tinysrgb&w=400",
      schedule: [
        { day: "Tuesday", time: "10:00 AM" },
        { day: "Thursday", time: "07:00 PM" },
        { day: "Sunday", time: "09:00 AM" },
      ],
      price: 20,
      rating: 4.9,
      enrolled: 12,
    },
    {
      id: 3,
      name: "Strength Training",
      type: "strength",
      difficulty: "advanced",
      trainer: "Mike Wilson",
      trainerId: 3,
      duration: 60,
      capacity: 12,
      description:
        "Build lean muscle and increase your strength with compound movements and progressive overload techniques.",
      image:
        "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400",
      schedule: [
        { day: "Monday", time: "06:00 PM" },
        { day: "Wednesday", time: "07:00 AM" },
        { day: "Friday", time: "06:00 PM" },
      ],
      price: 30,
      rating: 4.7,
      enrolled: 10,
    },
    {
      id: 4,
      name: "Zumba Dance Fitness",
      type: "dance",
      difficulty: "beginner",
      trainer: "Lisa Rodriguez",
      trainerId: 4,
      duration: 45,
      capacity: 25,
      description:
        "Dance your way to fitness with high-energy Latin rhythms. Fun, effective, and suitable for all fitness levels.",
      image:
        "https://images.pexels.com/photos/3775593/pexels-photo-3775593.jpeg?auto=compress&cs=tinysrgb&w=400",
      schedule: [
        { day: "Tuesday", time: "07:00 PM" },
        { day: "Thursday", time: "10:00 AM" },
        { day: "Saturday", time: "11:00 AM" },
      ],
      price: 22,
      rating: 4.6,
      enrolled: 22,
    },
    {
      id: 5,
      name: "CrossFit Training",
      type: "strength",
      difficulty: "advanced",
      trainer: "David Brown",
      trainerId: 5,
      duration: 50,
      capacity: 15,
      description:
        "Functional movements performed at high intensity. Build strength, endurance, and mental toughness.",
      image:
        "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400",
      schedule: [
        { day: "Monday", time: "08:00 PM" },
        { day: "Wednesday", time: "05:00 AM" },
        { day: "Saturday", time: "08:00 AM" },
      ],
      price: 35,
      rating: 4.9,
      enrolled: 14,
    },
    {
      id: 6,
      name: "Pilates Core",
      type: "strength",
      difficulty: "intermediate",
      trainer: "Jennifer Lee",
      trainerId: 6,
      duration: 45,
      capacity: 16,
      description:
        "Strengthen your core, improve posture, and enhance flexibility with precise, controlled movements.",
      image:
        "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400",
      schedule: [
        { day: "Tuesday", time: "09:00 AM" },
        { day: "Thursday", time: "06:00 PM" },
        { day: "Sunday", time: "10:00 AM" },
      ],
      price: 28,
      rating: 4.8,
      enrolled: 13,
    },
  ],

  trainers: [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: ["HIIT", "Cardio", "Weight Loss"],
      experience: 8,
      certifications: ["NASM-CPT", "ACSM", "TRX"],
      bio: "Sarah is a passionate fitness coach with over 8 years of experience helping clients achieve their health and fitness goals. She specializes in high-intensity training and has helped hundreds of clients transform their lives.",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      clients: 150,
      achievements: ["Best Trainer 2023", "Transformation Coach Award"],
      contact: {
        email: "sarah@fitzone.com",
        instagram: "@sarahfitness",
      },
    },
    {
      id: 2,
      name: "Emma Davis",
      specialty: ["Yoga", "Meditation", "Flexibility"],
      experience: 6,
      certifications: ["RYT-500", "Yin Yoga", "Meditation Teacher"],
      bio: "Emma brings a holistic approach to fitness, combining physical practice with mindfulness. Her yoga classes are designed to build strength while promoting inner peace and balance.",
      image:
        "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      clients: 120,
      achievements: ["Yoga Alliance Certified", "Mindfulness Coach"],
      contact: {
        email: "emma@fitzone.com",
        instagram: "@emmayoga",
      },
    },
    {
      id: 3,
      name: "Mike Wilson",
      specialty: ["Strength Training", "Powerlifting", "Muscle Building"],
      experience: 12,
      certifications: ["CSCS", "USAPL Coach", "Precision Nutrition"],
      bio: "Mike is a former competitive powerlifter with over 12 years of training experience. He helps clients build serious strength and muscle while maintaining proper form and injury prevention.",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      clients: 200,
      achievements: [
        "State Powerlifting Champion",
        "Strength Coach of the Year",
      ],
      contact: {
        email: "mike@fitzone.com",
        instagram: "@mikestrong",
      },
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      specialty: ["Dance Fitness", "Zumba", "Latin Dance"],
      experience: 5,
      certifications: ["Zumba Instructor", "Dance Fitness Certified"],
      bio: "Lisa brings the party to fitness! Her energetic dance classes make working out fun and engaging. She believes fitness should be enjoyable and accessible to everyone.",
      image:
        "https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      clients: 180,
      achievements: ["Top Zumba Instructor", "Community Choice Award"],
      contact: {
        email: "lisa@fitzone.com",
        instagram: "@lisadancefit",
      },
    },
    {
      id: 5,
      name: "David Brown",
      specialty: ["CrossFit", "Functional Training", "Athletic Performance"],
      experience: 10,
      certifications: ["CrossFit Level 3", "USAW", "FMS"],
      bio: "David is a CrossFit veteran who has competed at the regional level. He focuses on functional movements and helps athletes of all levels improve their performance and overall fitness.",
      image:
        "https://images.pexels.com/photos/1681104/pexels-photo-1681104.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      clients: 160,
      achievements: [
        "CrossFit Regional Competitor",
        "Functional Movement Specialist",
      ],
      contact: {
        email: "david@fitzone.com",
        instagram: "@davidcrossfit",
      },
    },
    {
      id: 6,
      name: "Jennifer Lee",
      specialty: ["Pilates", "Core Training", "Rehabilitation"],
      experience: 7,
      certifications: ["PMA Certified", "Stott Pilates", "Corrective Exercise"],
      bio: "Jennifer combines her background in physical therapy with Pilates instruction to help clients build core strength, improve posture, and recover from injuries.",
      image:
        "https://images.pexels.com/photos/3768905/pexels-photo-3768905.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      clients: 140,
      achievements: ["Pilates Master Trainer", "Rehabilitation Specialist"],
      contact: {
        email: "jennifer@fitzone.com",
        instagram: "@jenniferpilates",
      },
    },
  ],

  membershipPlans: [
    {
      id: 1,
      name: "Basic",
      monthlyPrice: 29,
      annualPrice: 279,
      features: [
        "Access to gym facilities",
        "Basic group classes",
        "Locker room access",
        "Online workout videos",
        "Mobile app access",
      ],
      popular: false,
      color: "gray",
    },
    {
      id: 2,
      name: "Premium",
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        "Everything in Basic",
        "All group classes",
        "Personal training (2 sessions/month)",
        "Nutrition consultation",
        "Priority booking",
        "Guest passes (2/month)",
      ],
      popular: true,
      color: "primary",
    },
    {
      id: 3,
      name: "Elite",
      monthlyPrice: 79,
      annualPrice: 758,
      features: [
        "Everything in Premium",
        "Unlimited personal training",
        "Weekly massage therapy",
        "Custom meal plans",
        "VIP locker room",
        "Unlimited guest passes",
        "24/7 gym access",
      ],
      popular: false,
      color: "accent",
    },
  ],

  products: [
    {
      id: 1,
      name: "Premium Protein Powder",
      category: "supplements",
      price: 49.99,
      originalPrice: 59.99,
      image:
        "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 125,
      description: "High-quality whey protein for muscle building and recovery",
    },
    {
      id: 2,
      name: "Resistance Bands Set",
      category: "equipment",
      price: 24.99,
      originalPrice: 34.99,
      image:
        "https://images.pexels.com/photos/4162573/pexels-photo-4162573.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 89,
      description: "Complete set of resistance bands for full-body workouts",
    },
    {
      id: 3,
      name: "Yoga Mat Premium",
      category: "equipment",
      price: 39.99,
      originalPrice: 49.99,
      image:
        "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 210,
      description: "Non-slip premium yoga mat for all types of practice",
    },
    {
      id: 4,
      name: "Athletic Performance Tee",
      category: "apparel",
      price: 29.99,
      originalPrice: 39.99,
      image:
        "https://images.pexels.com/photos/6551072/pexels-photo-6551072.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 67,
      description: "Moisture-wicking athletic shirt for intense workouts",
    },
    {
      id: 5,
      name: "Pre-Workout Energy",
      category: "supplements",
      price: 34.99,
      originalPrice: 44.99,
      image:
        "https://images.pexels.com/photos/4162588/pexels-photo-4162588.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      reviews: 93,
      description: "Natural pre-workout supplement for enhanced performance",
    },
    {
      id: 6,
      name: "Adjustable Dumbbells",
      category: "equipment",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.pexels.com/photos/4162512/pexels-photo-4162512.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 156,
      description: "Space-saving adjustable dumbbells for home workouts",
    },
  ],

  blogPosts: [
    {
      id: 1,
      title: "10 Benefits of High-Intensity Interval Training",
      excerpt:
        "Discover why HIIT is one of the most effective workout methods for burning fat and improving cardiovascular health.",
      image:
        "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Sarah Mitchell",
      date: "2024-01-15",
      category: "Fitness Tips",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Nutrition Guide: Fueling Your Workouts",
      excerpt:
        "Learn what to eat before and after workouts to maximize your performance and recovery.",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Nutritionist Emily Chen",
      date: "2024-01-12",
      category: "Nutrition",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Building a Home Gym on Any Budget",
      excerpt:
        "Create an effective workout space at home without breaking the bank. Essential equipment and space-saving tips.",
      image:
        "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Fitness Expert Tom Johnson",
      date: "2024-01-10",
      category: "Home Fitness",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "The Science of Recovery: Why Rest Days Matter",
      excerpt:
        "Understanding the importance of recovery in your fitness journey and how to optimize your rest days.",
      image:
        "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Michael Roberts",
      date: "2024-01-08",
      category: "Recovery",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Morning vs. Evening Workouts: What’s Better?",
      excerpt:
        "Explore the pros and cons of working out at different times of the day and choose what suits your routine.",
      image:
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Coach Linda Park",
      date: "2024-01-06",
      category: "Training Advice",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Top 5 Supplements for Muscle Gain",
      excerpt:
        "A guide to safe and effective supplements that can help enhance your strength and muscle-building results.",
      image:
        "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Kevin Stone",
      date: "2024-01-03",
      category: "Nutrition",
      readTime: "6 min read",
    },
    {
      id: 7,
      title: "Stretching Routines to Avoid Injuries",
      excerpt:
        "Prevent injuries and improve flexibility with daily stretching routines tailored for gym-goers.",
      image:
        "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Coach Aisha Brown",
      date: "2024-01-02",
      category: "Injury Prevention",
      readTime: "5 min read",
    },
    {
      id: 8,
      title: "Mental Health and Fitness: A Powerful Connection",
      excerpt:
        "Explore how regular exercise boosts mental well-being and reduces stress and anxiety.",
      image:
        "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Angela Torres",
      date: "2024-01-01",
      category: "Wellness",
      readTime: "6 min read",
    },
    {
      id: 9,
      title: "How to Stay Motivated Year-Round",
      excerpt:
        "Fitness goals aren't just for January. Learn mindset strategies to stay consistent all year.",
      image:
        "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Motivational Coach Dave Lang",
      date: "2023-12-28",
      category: "Motivation",
      readTime: "4 min read",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Jessica Thompson",
      content:
        "FitZone transformed my life! I lost 30 pounds and gained so much confidence. The trainers are amazing and the community is incredibly supportive.",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      role: "Member since 2022",
      rating: 5,
    },
    {
      id: 2,
      name: "Mark Rodriguez",
      content:
        "The variety of classes keeps me motivated. I've built more muscle in 6 months here than I did in years of working out alone. Highly recommend!",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
      role: "Elite Member",
      rating: 5,
    },
    {
      id: 3,
      name: "Amanda Foster",
      content:
        "As a busy mom, I love the flexible class schedule and childcare options. FitZone makes fitness accessible and enjoyable for everyone.",
      image:
        "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=100",
      role: "Premium Member",
      rating: 5,
    },
  ],

  upcomingClasses: [
    {
      id: 1,
      name: "Morning HIIT",
      trainer: "Sarah Johnson",
      time: "07:00 AM",
      date: "Today",
      duration: 45,
    },
    {
      id: 2,
      name: "Vinyasa Flow",
      trainer: "Emma Davis",
      time: "06:00 PM",
      date: "Today",
      duration: 60,
    },
    {
      id: 3,
      name: "Strength Training",
      trainer: "Mike Wilson",
      time: "09:00 AM",
      date: "Tomorrow",
      duration: 60,
    },
  ],

  workoutLog: [
    {
      id: 1,
      date: "2024-01-15",
      workout: "HIIT Training",
      duration: 45,
      calories: 420,
      exercises: ["Burpees", "Mountain Climbers", "Jump Squats"],
    },
    {
      id: 2,
      date: "2024-01-14",
      workout: "Strength Training",
      duration: 60,
      calories: 380,
      exercises: ["Deadlifts", "Bench Press", "Squats"],
    },
    {
      id: 3,
      date: "2024-01-13",
      workout: "Yoga Flow",
      duration: 60,
      calories: 200,
      exercises: ["Sun Salutations", "Warrior Poses", "Balance Poses"],
    },
  ],
};

// Chart data for dashboard
const chartData = {
  weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Burned",
        data: [420, 0, 380, 450, 0, 500, 350],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
};

// Export data
window.mockData = mockData;
window.chartData = chartData;
