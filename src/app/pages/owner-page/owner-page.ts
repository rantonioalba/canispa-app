import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import {  Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaginatiomRangePipe } from '../paginatiom-range-pipe';

interface SearchFilters {
  name: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
  status: boolean;
  skills: boolean;
  projects: boolean;
}


@Component({
  selector: 'owner-page',
  imports: [NgFor, DatePipe, NgIf, SlicePipe, PaginatiomRangePipe],
  templateUrl: './owner-page.html',
  styleUrls: ['./owner-page.css'],
})
export default class OwnerPage implements OnInit {
  authService = inject(AuthService);

  profile = this.authService.profile;

 expandedRows: Set<number> = new Set([1, 2, 3, 4, 5]);
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = true;

  // Track which row's menu is open
  openMenuId: number | null = null;

  // Search functionality
  searchTerm = signal('');
  searchFilters = signal<SearchFilters>({
    name: true,
    email: true,
    phone: true,
    address: true,
    status: true,
    skills: true,
    projects: true
  });
  showAdvancedSearch: boolean = false;
  filteredData: any[] = [];

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage = signal<number>(5);
  pageSizeOptions: number[] = [5, 10, 25, 50];
  paginatedData: any[] = [];


  originalData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '2288788990',
      address: 'address 123',
      status: 'Active',
      joinDate: '2023-01-15',
      avatarUrl: 'https://images.dog.ceo/breeds/shiba/shiba-2.jpg',
      details: {
        projects: [
          {
            name: 'Website Redesign',
            role: 'Lead',
            hours: 120,
            status: 'In Progress',
            deadline: '2024-06-30',
            imageUrl: 'https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_640.jpg',
            description: 'Complete overhaul of company website with modern design'
          },
          {
            name: 'Mobile App',
            role: 'Architect',
            hours: 85,
            status: 'Completed',
            deadline: '2024-03-15',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_640.jpg',
            description: 'Cross-platform mobile application development'
          }
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
      address: 'address 456',
      status: 'Active',
      joinDate: '2023-03-20',
      avatarUrl: 'https://images.dog.ceo/breeds/husky/n02110185_100.jpg',
      details: {
        projects: [
          {
            name: 'API Integration',
            role: 'Developer',
            hours: 95,
            status: 'Completed',
            deadline: '2024-02-28',
            imageUrl: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_640.jpg',
            description: 'RESTful API development and third-party integrations'
          },
          {
            name: 'Database Migration',
            role: 'Lead',
            hours: 45,
            status: 'Completed',
            deadline: '2024-01-31',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/12/12/15/24/data-1089903_640.jpg',
            description: 'Migration from SQL to NoSQL database'
          },
          {
            name: 'Cloud Migration',
            role: 'Developer',
            hours: 60,
            status: 'Planning',
            deadline: '2024-08-15',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/05/21/10/59/cloud-4219516_640.jpg',
            description: 'Moving infrastructure to AWS cloud platform'
          }
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
      address: 'address 789',
      status: 'Active',
      joinDate: '2023-02-10',
      avatarUrl: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_100.jpg',
      details: {
        projects: [
          {
            name: 'UI Kit',
            role: 'Lead Designer',
            hours: 60,
            status: 'Completed',
            deadline: '2024-01-20',
            imageUrl: 'https://cdn.pixabay.com/photo/2018/05/08/08/44/art-3382524_640.jpg',
            description: 'Design system and component library'
          },
          {
            name: 'Prototype',
            role: 'Designer',
            hours: 30,
            status: 'In Progress',
            deadline: '2024-05-10',
            imageUrl: 'https://cdn.pixabay.com/photo/2016/03/27/22/23/prototype-1284710_640.jpg',
            description: 'Interactive prototype for new features'
          },
          {
            name: 'Brand Identity',
            role: 'Lead',
            hours: 45,
            status: 'Completed',
            deadline: '2024-02-15',
            imageUrl: 'https://cdn.pixabay.com/photo/2017/08/06/22/01/design-2595545_640.jpg',
            description: 'Complete brand redesign and guidelines'
          }
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
      address: 'address 101',
      status: 'Active',
      joinDate: '2023-04-05',
      avatarUrl: 'https://images.dog.ceo/breeds/labrador/n02099712_100.jpg',
      details: {
        projects: [
          {
            name: 'Product Launch',
            role: 'Manager',
            hours: 150,
            status: 'In Progress',
            deadline: '2024-07-15',
            imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/launch-1867173_640.jpg',
            description: 'Q3 product launch strategy and execution'
          },
          {
            name: 'Market Research',
            role: 'Lead',
            hours: 40,
            status: 'Completed',
            deadline: '2024-03-30',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_640.jpg',
            description: 'Competitor analysis and market trends'
          }
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
      address: 'Quality Assurance',
      status: 'Inactive',
      joinDate: '2023-01-30',
      avatarUrl: 'https://images.dog.ceo/breeds/pug/n02110958_100.jpg',
      details: {
        projects: [
          {
            name: 'Testing Automation',
            role: 'Lead',
            hours: 80,
            status: 'Completed',
            deadline: '2024-02-28',
            imageUrl: 'https://cdn.pixabay.com/photo/2016/02/19/11/19/developer-1209800_640.jpg',
            description: 'Automated testing framework implementation'
          },
          {
            name: 'Performance Testing',
            role: 'Engineer',
            hours: 55,
            status: 'In Progress',
            deadline: '2024-06-20',
            imageUrl: 'https://cdn.pixabay.com/photo/2018/05/18/00/59/speed-3410980_640.jpg',
            description: 'Load testing and performance optimization'
          }
        ],
        skills: ['Selenium', 'Cypress', 'Jest', 'Postman'],
        performance: 'Satisfactory',
        manager: 'Jane Smith',
        location: 'Chicago, IL',
        phone: '+1 (555) 567-8901',
        bio: 'Quality assurance expert in automation'
      }
    },
    // Adding 10 more employees for pagination demo
    {
      id: 6,
      name: 'David Miller',
      email: 'david@example.com',
      phone: '45448788990',
      address: 'Operations',
      status: 'Active',
      joinDate: '2023-05-10',
      avatarUrl: 'https://images.dog.ceo/breeds/mastiff-bull/n02108422_100.jpg',
      details: {
        projects: [
          { name: 'CI/CD Pipeline', role: 'Lead', hours: 100, status: 'Completed', deadline: '2024-04-15', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_640.jpg', description: 'Automated deployment pipeline' }
        ],
        skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
        performance: 'Excellent',
        manager: 'John Doe',
        location: 'Boston, MA',
        phone: '+1 (555) 678-9012',
        bio: 'DevOps specialist'
      }
    },
    {
      id: 7,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '5655989900',
      address: 'Creative',
      status: 'Active',
      joinDate: '2023-06-15',
      avatarUrl: 'https://images.dog.ceo/breeds/corgi-cardigan/n02113186_100.jpg',
      details: {
        projects: [
          { name: 'User Research', role: 'Lead', hours: 70, status: 'In Progress', deadline: '2024-07-20', imageUrl: 'https://cdn.pixabay.com/photo/2018/05/08/08/44/art-3382524_640.jpg', description: 'User experience research' }
        ],
        skills: ['Figma', 'Sketch', 'User Testing', 'Wireframing'],
        performance: 'Outstanding',
        manager: 'Bob Johnson',
        location: 'Portland, OR',
        phone: '+1 (555) 789-0123',
        bio: 'UX design expert'
      }
    },
    {
      id: 8,
      name: 'Frank Thomas',
      email: 'frank@example.com',
      phone: '7876989900',
      address: 'Engineering',
      status: 'Active',
      joinDate: '2023-07-22',
      avatarUrl: 'https://images.dog.ceo/breeds/dachshund/n02087046_100.jpg',
      details: {
        projects: [
          { name: 'Microservices', role: 'Lead', hours: 120, status: 'Planning', deadline: '2024-09-10', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_640.jpg', description: 'Microservices architecture' }
        ],
        skills: ['Java', 'Spring Boot', 'Kafka', 'Redis'],
        performance: 'Good',
        manager: 'Jane Smith',
        location: 'Denver, CO',
        phone: '+1 (555) 890-1234',
        bio: 'Backend architect'
      }
    },
    {
      id: 9,
      name: 'Grace Lee',
      email: 'grace@example.com',
      phone: '8987989900',
      address: 'Engineering',
      status: 'Active',
      joinDate: '2023-08-30',
      avatarUrl: 'https://images.dog.ceo/breeds/chihuahua/n02085620_100.jpg',
      details: {
        projects: [
          { name: 'Component Library', role: 'Lead', hours: 90, status: 'In Progress', deadline: '2024-08-05', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_640.jpg', description: 'Reusable components' }
        ],
        skills: ['React', 'Vue.js', 'Tailwind', 'Webpack'],
        performance: 'Excellent',
        manager: 'John Doe',
        location: 'Los Angeles, CA',
        phone: '+1 (555) 901-2345',
        bio: 'Frontend specialist'
      }
    },
    {
      id: 10,
      name: 'Henry Adams',
      email: 'henry@example.com',
      phone: '9098989900',
      address: 'Analytics',
      status: 'Active',
      joinDate: '2023-09-14',
      avatarUrl: 'https://images.dog.ceo/breeds/beagle/n02088364_100.jpg',
      details: {
        projects: [
          { name: 'ML Pipeline', role: 'Lead', hours: 110, status: 'Planning', deadline: '2024-10-01', imageUrl: 'https://cdn.pixabay.com/photo/2015/12/12/15/24/data-1089903_640.jpg', description: 'Machine learning pipeline' }
        ],
        skills: ['Python', 'TensorFlow', 'Pandas', 'SQL'],
        performance: 'Outstanding',
        manager: 'Alice Williams',
        location: 'Austin, TX',
        phone: '+1 (555) 012-3456',
        bio: 'Data science expert'
      }
    }
  ];

ngOnInit() {
    this.filteredData = [...this.originalData];
    this.updatePaginatedData();
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    document.addEventListener('click', (event) => this.handleClickOutside(event));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.checkScreenSize());
    document.removeEventListener('click', (event) => this.handleClickOutside(event));
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 640;
    this.isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    this.isDesktop = window.innerWidth >= 1024;
  }

  // Pagination methods
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  changePage(page: string | number): void {
    const pageNum = typeof page === 'string' ? parseInt(page, 10) : page;
    this.currentPage = pageNum;
    this.updatePaginatedData();
    // Clear expanded rows when changing page
    this.expandedRows.clear();
  }

  changePageSize(size: string): void {
    if (size) {
    this.itemsPerPage.set(+size);
    this.currentPage = 1;
    this.updatePaginatedData();
    this.expandedRows.clear();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage());
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage() + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage();
    return end > this.filteredData.length ? this.filteredData.length : end;
  }

  // Search functionality
  filterData(): void {
    if (!this.searchTerm().trim()) {
      this.filteredData = [...this.originalData];
    } else {
      const searchLower = this.searchTerm().toLowerCase().trim();

      this.filteredData = this.originalData.filter(employee => {
        let matches = false;

        if (this.searchFilters().name && employee.name.toLowerCase().includes(searchLower)) {
          matches = true;
        }

        if (this.searchFilters().email && employee.email.toLowerCase().includes(searchLower)) {
          matches = true;
        }

        if (this.searchFilters().phone && employee.phone.toLowerCase().includes(searchLower)) {
          matches = true;
        }

        if (this.searchFilters().address && employee.details.location.toLowerCase().includes(searchLower)) {
          matches = true;
        }

        if (this.searchFilters().status && employee.status.toLowerCase().includes(searchLower)) {
          matches = true;
        }

        if (this.searchFilters().skills && employee.details.skills.some(skill =>
          skill.toLowerCase().includes(searchLower)
        )) {
          matches = true;
        }

        if (this.searchFilters().projects && employee.details.projects.some(project =>
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower)
        )) {
          matches = true;
        }

        return matches;
      });
    }

    // Reset to first page when searching
    this.currentPage = 1;
    this.updatePaginatedData();
    this.expandedRows.clear();
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.filteredData = [...this.originalData];
    this.currentPage = 1;
    this.updatePaginatedData();
    this.showAdvancedSearch = false;
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  updateSearchFilter(filter: string, event: any): void {
    this.searchFilters[filter as keyof typeof this.searchFilters] = event.target.checked;
    this.filterData();
  }

  getSearchResultCount(): number {
    return this.filteredData.length;
  }

  // Row management
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
    this.paginatedData.forEach(item => {
      this.expandedRows.add(item.id);
    });
  }

  isExpanded(id: number): boolean {
    return this.expandedRows.has(id);
  }

  // Menu methods
  toggleMenu(id: number, event: Event): void {
    event.stopPropagation();
    if (this.openMenuId === id) {
      this.openMenuId = null;
    } else {
      this.openMenuId = id;
    }
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.openMenuId = null;
    }
  }

  // CRUD Operations
  addEmployee(): void {
    const newId = Math.max(...this.originalData.map(e => e.id)) + 1;
    const newEmployee = {
      id: newId,
      name: 'New Employee',
      email: 'new@example.com',
      phone: '2258788990',
      address: 'New Department',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      avatarUrl: 'https://images.dog.ceo/breeds/shiba/shiba-2.jpg',
      details: {
        projects: [],
        skills: ['New Skill'],
        performance: 'Good',
        manager: 'TBD',
        location: 'TBD',
        phone: 'TBD',
        bio: 'New employee description'
      }
    };
    this.originalData.push(newEmployee);
    this.filterData();
    this.openMenuId = null;
    alert(`Add new employee: ${newEmployee.name}`);
  }

  editEmployee(id: number): void {
    const employee = this.originalData.find(e => e.id === id);
    this.openMenuId = null;
    alert(`Edit employee: ${employee?.name}\nID: ${id}\nYou can implement an edit modal/form here`);
  }

  deleteEmployee(id: number): void {
    const employee = this.originalData.find(e => e.id === id);
    if (confirm(`Are you sure you want to delete ${employee?.name}?`)) {
      const index = this.originalData.findIndex(e => e.id === id);
      if (index !== -1) {
        this.originalData.splice(index, 1);
        this.filterData();
        this.expandedRows.delete(id);
      }
    }
    this.openMenuId = null;
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
  } }
