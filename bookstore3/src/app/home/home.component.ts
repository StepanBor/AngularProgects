import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BookItem} from '../data-models/BookItem';
import {Observable, Subscription} from 'rxjs';
import {DataAccessService} from '../data-access-services/data-access.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  serverURL = environment.serverURL;

  bookItems: BookItem[] = [new BookItem(null, null, null, null, null, null, null, null, null, null, null)];
  // storageBooks: StorageBooks;
  totalBookCount: number;

  subscriptionBookItems: Subscription;
  subscriptionTotalBookItemCount: Subscription;
  // subscriptionStorageBooks: Subscription;


  itemsPerPage: number;
  paginationArr: number[] = [1];
  currentPage: number;
  @Input() sortBy: string;
  url: string;
  changeSortDirect: boolean;
  activeRow: number;
  activeBookId: number;
  activeBook: BookItem = this.bookItems[0];
  changedBooksId: number[] = [-1];
  changeSortDirection: boolean;

  newBookItemId: number;
  files: any;

  arr1: number[] = [];
  arr2: number[] = [];

  @Input() activeFilters: Map<string, string[]> = new Map();
  activeFiltersArr: string[] = [];
  subscritionActiveFilters: Subscription;

  constructor(private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    this.changeSortDirect = true;
    this.itemsPerPage = 12;
    this.subscritionActiveFilters = this.dataAccessService.activeFiltersChanged
      .subscribe((filters: Map<string, string[]>) => {
        this.activeFilters = filters;
        this.activeFiltersArr = Array.from(this.activeFilters.keys());
        if (this.activeFilters.size !== 0) {
          this.dataAccessService.getBookItemsByParam2(this.activeFilters,
            this.sortBy, this.itemsPerPage, this.currentPage, this.changeSortDirect);
        }
      });
    this.subscriptionBookItems = this.dataAccessService.bookItemsChanged.subscribe((bookItems1: BookItem[]) => {
      this.bookItems = bookItems1;
      this.activeBook = bookItems1[0];
      this.arr1 = Array(((this.bookItems.length - 6) >= 0) ? 6 : this.bookItems.length).fill(0).map((x, i) => i);
      this.arr2 = Array((this.bookItems.length === 12) ? 6
        : (((this.bookItems.length - 6) < 0) ? 0 : (this.bookItems.length - 6))).fill(0).map((x, i) => (i + 6));
    });
    this.subscriptionTotalBookItemCount = this.dataAccessService.totalBookItemCountChanged
      .subscribe((count: number) => {
        this.totalBookCount = count;
        this.paginationArr = Array((this.totalBookCount % this.itemsPerPage) === 0 ?
          Math.floor(this.totalBookCount / this.itemsPerPage) : Math.floor(this.totalBookCount / this.itemsPerPage) + 1)
          .fill(0).map((x, i) => i);
      });


    this.currentPage = 1;
    this.sortBy = 'author';
    this.changeSortDirect = false;
    this.url = this.serverURL + 'bookItems?sortBy=' + this.sortBy
      + '&changeSortDirect=' + true + '&page=' + this.currentPage + '&itemsPerPage=' + this.itemsPerPage;
    this.activeRow = -1;
    this.activeBookId = 0;
    this.dataAccessService.getTotalBookItemsCount();
    this.dataAccessService.getBookItems(this.url);
    /*this.serverURL+'bookItems?page=1&itemsPerPage=12&sortBy=author'*/

  }


  onSortGet(sortBy: string, page: number) {
    if (this.activeFilters.size !== 0) {
      this.dataAccessService.getBookItemsByParam2(this.activeFilters, sortBy,
        this.itemsPerPage, page, this.changeSortDirect);
      this.sortBy = sortBy;
      this.currentPage = page;
      this.changeSortDirect = !this.changeSortDirect;
    } else {
      this.sortBy = sortBy;
      this.currentPage = page;
      this.url = this.serverURL + 'bookItems?sortBy=' + this.sortBy
        + '&changeSortDirect=' + this.changeSortDirect + '&page=' + this.currentPage + '&itemsPerPage=' + this.itemsPerPage;
      console.log(this.url);
      this.dataAccessService.getBookItems(this.url);
      this.dataAccessService.getTotalBookItemsCount();
      // this.changeSortDirect = !this.changeSortDirect;
    }
  }

  setActiveRow(index1: number, bookId: number) {
    this.activeRow = index1;
    this.activeBookId = bookId;
    for (const book of this.bookItems) {
      if (book.id === bookId) {
        this.activeBook = book;
        // console.log(this.activeOrder.orderList[0]);
      }
    }
  }

  setChangedBooksId(id: number) {
    if (this.changedBooksId.indexOf(id) === -1) {
      this.changedBooksId.push(id);
    }
  }

  isBookChanged(id: number): boolean {
    for (const num of this.changedBooksId) {
      if (num === id) {
        return true;
      }
    }
    return false;
  }

  onSaveBookItem(bookToSave: BookItem) {
    this.dataAccessService.saveBookItem(bookToSave).subscribe((response) => {
      console.log(response);
      // if (response.status === 200) {
      //   // this.isModalActive = true;
      // }
    });
    this.changedBooksId.splice(this.changedBooksId.indexOf(bookToSave.id), 1);
    console.log(this.changedBooksId);
  }

  closeModal() {
    // this.isModalActive = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changedBooksId.length >= 2) {
      return confirm('Do you want discard changes?');
    }
    return true;
  }

  deleteBookItem(bookToDelete: BookItem) {
    if (confirm('Delete book' + bookToDelete.id)) {
      for (let i = 0; i < this.bookItems.length; i++) {
        if (this.bookItems[i].id === bookToDelete.id) {
          this.bookItems.splice(i, 1);
          this.dataAccessService.deleteBookItem(bookToDelete.id).subscribe((response) => {
            console.log(response);
            if (response.status === 200) {
              // this.isDeleteModalActive = true;
            }
          });
        }
      }
    }
  }

  saveAllChanges() {
    for (let i = 0; i < this.bookItems.length; i++) {
      for (let j = 0; j < this.changedBooksId.length; j++) {
        if (this.bookItems[i].id === this.changedBooksId[j]) {
          this.onSaveBookItem(this.bookItems[i]);
        }
      }
    }
  }

  onSubmitBookItem(form: HTMLFormElement) {
    console.log(form);
    let final_data;
    // let newUserData: string[];
    const formData = new FormData();
    if (this.files != null) {
      const files: FileList = this.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('cover', files[i]);
      }
    }
    formData.append('bookName', form.value.bookName);
    formData.append('author', form.value.author);
    formData.append('publisherId', form.value.publisherId);
    formData.append('publisherName', form.value.publisherName);
    formData.append('publisherDescription', form.value.publisherName);
    formData.append('publisherAdress', form.value.publisherAdress);
    formData.append('category', form.value.category);
    formData.append('price', form.value.price);
    formData.append('isbn', form.value.isbn);
    // formData.append('password', form.value.password);

    final_data = formData;
    // } else {
    //   // Если нет файла, то слать как обычный JSON
    //   final_data = form.value;
    // }

    this.dataAccessService.createNewBookItem(final_data).subscribe((response) => {
      console.log(response);
    });
  }

  sortBooks(form: HTMLFormElement) {
    this.changeSortDirect = true;
    this.onSortGet(form.value.sortBy, this.currentPage);
  }

  deleteFromFilter(key: string) {
    if (this.dataAccessService.activeFilters.get(key).length === 0) {
      this.activeFilters.delete(key);
    } else {
      this.dataAccessService.activeFilters.get(key).pop();
      if (this.dataAccessService.activeFilters.get(key).length === 0) {
        this.activeFilters.delete(key);
      }
    }

    if (this.activeFilters.size === 0) {
      this.currentPage = 1;
      this.sortBy = 'author';
      this.changeSortDirect = false;
      this.url = this.serverURL + 'bookItems?sortBy=' + this.sortBy
        + '&changeSortDirect=' + true + '&page=' + this.currentPage + '&itemsPerPage=' + this.itemsPerPage;
      this.activeRow = -1;
      this.activeBookId = 0;
      this.dataAccessService.getTotalBookItemsCount();
      this.dataAccessService.getBookItems(this.url);
    }
    console.log(this.activeFilters);
    this.dataAccessService.activeFiltersChanged.next(this.dataAccessService.activeFilters);
  }
}
