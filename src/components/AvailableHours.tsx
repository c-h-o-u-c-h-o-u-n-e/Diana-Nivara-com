interface AvailableHoursProps {
  selectedDay: string;
  experienceType: string;
  duration: string;
  selectedTime?: string;
  onTimeSelect?: (time: string) => void;
}

export default function AvailableHours({ selectedDay, experienceType, duration, selectedTime, onTimeSelect }: AvailableHoursProps) {
  if (!selectedDay || !experienceType) {
    return null;
  }

  // Determine day of week from selected day number
  const dayNumber = parseInt(selectedDay, 10);
  const isWeekend = dayNumber === 6 || dayNumber === 7 || dayNumber === 13 || dayNumber === 14 || 
                    dayNumber === 20 || dayNumber === 21 || dayNumber === 27 || dayNumber === 28;

  // Define available time slots based on experience type, day, and duration
  let timeSlots: string[] = [];

  // Check if duration is Overnight
  const isOvernight = duration === 'Overnight';

  if (experienceType === 'Incall') {
    // Incall: Weekends only
    if (isWeekend) {
      if (isOvernight) {
        // Overnight: 7 PM – Midnight
        timeSlots = ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'];
      } else {
        // Regular hours: 10 AM – 6 PM
        timeSlots = [
          '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
          '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
        ];
      }
    }
  } else if (experienceType === 'Outcall') {
    if (isWeekend) {
      if (isOvernight) {
        // Overnight: 7 PM – Midnight
        timeSlots = ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'];
      } else {
        // Regular hours: All day
        timeSlots = [
          '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
          '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
          '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
        ];
      }
    } else {
      if (isOvernight) {
        // Overnight: 7 PM – Midnight
        timeSlots = ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'];
      } else {
        // Weekdays: From 9 PM
        timeSlots = ['9:00 PM', '10:00 PM', '11:00 PM'];
      }
    }
  }

  if (timeSlots.length === 0) {
    return (
      <div style={{ marginBottom: '32px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
          }}
        >
          No available hours for this selection<br/>Please check my availability here
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
        }}
      >
        Please pick your preferred meeting time below.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {timeSlots.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <button
              key={time}
              type="button"
              onClick={() => onTimeSelect?.(time)}
              style={{
                minWidth: '90px',
                padding: '8px 16px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: isSelected ? 'var(--color-bg-primary)' : 'var(--color-text-primary)',
                backgroundColor: isSelected ? 'var(--color-accent)' : 'transparent',
                border: `1px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'rgba(139, 122, 107, 0.08)';
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }
              }}
            >
              <span style={{ position: 'relative', top: '-2px' }}>{time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
