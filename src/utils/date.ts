class DateFormatter
{
    public static format(date: string | undefined | null): string
    {
        if (!date) return date ?? "--";
        const d = new Date(date);

        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(d);
    }
}

export default DateFormatter;
