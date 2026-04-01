import { DatePipe, NgFor, NgIf } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'owner-page',
  imports: [NgFor, DatePipe, NgIf],
  templateUrl: './owner-page.html',
  styleUrls: ['./owner-page.css'],
})
export default class OwnerPage {
  authService = inject(AuthService);

  profile = this.authService.profile;

  expandedRows: Set<number> = new Set([1, 2, 3, 4, 5]);

  // Responsive breakpoints
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = true;

  data = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '2288788990',
      department: 'IT',
      status: 'Active',
      avatarUrl: 'https://images.dog.ceo/breeds/shiba/shiba-2.jpg',
      joinDate: '2023-01-15',
      address: 'New York, NY',
      details: {
        projects: [
          { name: 'Website Redesign', role: 'Lead', hours: 120, status: 'In Progress', deadline: '2024-06-30' },
          { name: 'Mobile App', role: 'Architect', hours: 85, status: 'Completed', deadline: '2024-03-15' }
        ],
        skills: ['Angular', 'TypeScript', 'Node.js', 'MongoDB'],
        performance: 'Excellent',
        manager: 'Sarah Johnson',
        location: 'New York, NY',
        phone: '+1 (555) 123-4567',
        bio: 'Full-stack developer with 8+ years of experience'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '2288788990',
      department: 'Engineering',
      status: 'Active',
      avatarUrl: 'https://images.dog.ceo/breeds/shiba/shiba-2.jpg',
      joinDate: '2023-03-20',
      address: 'San Francisco, CA',
      details: {
        projects: [
          { name: 'API Integration', role: 'Developer', hours: 95, status: 'Completed', deadline: '2024-02-28' },
          { name: 'Database Migration', role: 'Lead', hours: 45, status: 'Completed', deadline: '2024-01-31' },
          { name: 'Cloud Migration', role: 'Developer', hours: 60, status: 'Planning', deadline: '2024-08-15' }
        ],
        skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
        performance: 'Outstanding',
        manager: 'John Doe',
        location: 'San Francisco, CA',
        phone: '+1 (555) 234-5678',
        bio: 'Backend specialist focused on scalable solutions'
      }
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '2288788990',
      department: 'Creative',
      status: 'Active',
      avatarUrl: 'https://images.dog.ceo/breeds/shiba/shiba-3.jpg',
      joinDate: '2023-02-10',
      address: 'Austin, TX',
      details: {
        projects: [
          { name: 'UI Kit', role: 'Lead Designer', hours: 60, status: 'Completed', deadline: '2024-01-20' },
          { name: 'Prototype', role: 'Designer', hours: 30, status: 'In Progress', deadline: '2024-05-10' },
          { name: 'Brand Identity', role: 'Lead', hours: 45, status: 'Completed', deadline: '2024-02-15' }
        ],
        skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
        performance: 'Good',
        manager: 'Sarah Johnson',
        location: 'Austin, TX',
        phone: '+1 (555) 345-6789',
        bio: 'Creative designer with focus on user experience'
      }
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      phone: '2288788990',
      department: 'Product',
      status: 'Active',
      // Add avatar URL for each employee
      avatarUrl: 'https://images.dog.ceo/breeds/shiba/shiba-4.jpg',
      joinDate: '2023-04-05',
      address: 'Seattle, WA',
      details: {
        projects: [
          { name: 'Product Launch', role: 'Manager', hours: 150, status: 'In Progress', deadline: '2024-07-15' },
          { name: 'Market Research', role: 'Lead', hours: 40, status: 'Completed', deadline: '2024-03-30' }
        ],
        skills: ['Agile', 'Scrum', 'JIRA', 'Analytics'],
        performance: 'Excellent',
        manager: 'Mike Wilson',
        location: 'Seattle, WA',
        phone: '+1 (555) 456-7890',
        bio: 'Product strategist with 10+ years in tech'
      }
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      phone: '2288788990',
      department: 'Quality Assurance',
      status: 'Inactive',
      avatarUrl: 'https://images.dog.ceo/breeds/shiba/shiba-5.jpg',
      joinDate: '2023-01-30',
      address: 'Chicago, IL',
      details: {
        projects: [
          { name: 'Testing Automation', role: 'Lead', hours: 80, status: 'Completed', deadline: '2024-02-28' },
          { name: 'Performance Testing', role: 'Engineer', hours: 55, status: 'In Progress', deadline: '2024-06-20' }
        ],
        skills: ['Selenium', 'Cypress', 'Jest', 'Postman'],
        performance: 'Satisfactory',
        manager: 'Jane Smith',
        location: 'Chicago, IL',
        phone: '+1 (555) 567-8901',
        bio: 'Quality assurance expert in automation'
      }
    }
  ];

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 640;
    this.isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    this.isDesktop = window.innerWidth >= 1024;
  }

  toggleRow(id: number): void {
    if (this.expandedRows.has(id)) {
      this.expandedRows.delete(id);
    } else {
      this.expandedRows.add(id);
    }
  }

  collapseAll(): void {
    this.expandedRows.clear();
  }

  expandAll(): void {
    this.data.forEach(item => {
      this.expandedRows.add(item.id);
    });
  }

  isExpanded(id: number): boolean {
    return this.expandedRows.has(id);
  }

  getStatusColor(status: string): string {
    switch(status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getProjectStatusColor(status: string): string {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getProgressPercentage(status: string): number {
    switch(status.toLowerCase()) {
      case 'completed':
        return 100;
      case 'in progress':
        return 65;
      case 'planning':
        return 30;
      default:
        return 0;
    }
  }

 }
