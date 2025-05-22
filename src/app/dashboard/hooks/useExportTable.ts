'use client'

import { Application } from "@/lib/types"

export function useExportTable() {
    const exportCSV = (applications: Application[]) => {
        const tableHeaders = ['Job Title', 'Company', 'Status', 'Location', 'Date Applied', 'Next Interview', 'Salary Range', 'Interview Stage', 'Notes'];
    
        const csvContent = [
            tableHeaders.join(','),
            ...applications.map(app => [
                `"${app.jobTitle}"`,
                `"${app.company}"`,
                app.status,
                app.remote ? 'Remote' : `"${app.location || 'Not specified'}"`,
                app.dateApplied.toLocaleDateString(),
                app.nextInterviewDate?.toLocaleDateString() || '',
                `"${app.salaryRange || 'Not specified'}"`,
                app.interviewStage || 'Not specified',
                `"${app.notes?.replace(/"/g, '""') || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    };

    return {exportCSV}
}