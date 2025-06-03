const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 23 || hour < 5) return "Good Night";
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export default getGreeting;
