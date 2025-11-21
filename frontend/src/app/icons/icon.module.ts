import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faSignInAlt,
  faUserPlus,
  faThLarge,
  faUserCircle,
  faSignOutAlt,
  faCheck,
  faPlus,
  faTrash,
  faSearch,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faSignInAlt,
      faUserPlus,
      faThLarge,
      faUserCircle,
      faSignOutAlt,
      faCheck,
      faPlus,
      faTrash,
      faSearch,
      faPaperPlane
    );
  }
}
