<template>
  <div id="link-action">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          small
          class="action-buttons"
          :input-value="active()"
          @click="onClick()"
          v-on="on"
        >
          <v-icon>mdi-{{ icon }}</v-icon>
        </v-btn>
      </template>

      <span>{{ $t(`edition.editor.actions.${name}.name`) }}</span>
    </v-tooltip>

    <v-dialog v-model="showDialog" max-width="500" eager>
      <v-card>
        <v-card-title>{{
          $t(`edition.editor.actions.${name}.name`)
        }}</v-card-title>
        <v-card-text>
          <v-text-field
            :label="$t(`edition.editor.actions.${name}.fieldName`)"
            color="primary"
            clearable
            prepend-icon="mdi-link-variant"
            hide-details
            :disabled="!!imgSrc"
            v-model="url"
          />

          <span class="text-center text-uppercase title mt-5 d-block w-100">{{$t(`edition.editor.actions.${name}.or`)}}</span>

          <div v-show="!imgSrc">

              <input 
                id="dragndrop-input"
                ref="input"
                type="file"
                accept=".bmp,.jpg,.jpeg,.png,.gif,.webp"
              >
              <label 
                for="dragndrop-input"
                class="dragndrop mt-5"
                ref="dropzone"
              >
                <v-icon class="icon">mdi-image-filter-hdr</v-icon>
                <h3 class="text-center my-5">{{$t(`edition.editor.actions.${name}.dragndrop`)}}</h3>
              </label>        

          </div>
          <div v-if="imgSrc">
            <v-hover v-model="imgHover">
                <v-img :src="imgSrc" contain class="preview mt-5">
                  <v-overlay
                    absolute
                    v-if="imgHover"
                  >
                    <v-btn
                      depressed
                      color="error"
                      @click="deleteImage"
                    >
                      <v-icon>mdi-delete</v-icon>
                      {{$t(`edition.editor.actions.${name}.delete`)}}
                    </v-btn>
                  </v-overlay>
                </v-img>
            </v-hover>
          </div>

        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="error" 
            outlined 
            depressed 
            @click="closeDialog"
            class="ml-auto"
        >
            {{ $t(`edition.editor.actions.${name}.cancel`) }}
          </v-btn>
          <v-btn
            color="primary"
            depressed
            :loading="uploading"
            @click="addImage"
          >
            {{$t(`edition.editor.actions.${name}.validate`)}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss" scoped>
#dragndrop-input {
  display: none;
}
.dragndrop {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 4px;

  &:hover, &--dragover {
    border: 1px solid var(--v-primary-base);
    color: var(--v-primary-base);
    cursor: pointer;
  }

  .icon {
    font-size: 15rem;
    color: inherit;
  }
}

.preview {
  width: 100%; 
  max-height: 20rem;
}
</style>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import Action from "./Action";
import { firebaseService } from '../../../../services/firebase';
import { globalVariables } from '../../../../services/globalVariables';
import md5 from "md5";
import mime from "mime-types";
import { log } from 'util';

const HOLDER_CLASS = "dragndrop";

@Component
export default class ImageAction extends Action {
  name: string = "image";
  icon: string = "image";

  showDialog: boolean = false;
  uploading: boolean = false;
  imgHover: boolean = false;

  url: string = "";
  imgSrc: string = "";

  mounted() {
    const input: Element = (this.$refs.input as Element);
    const dropzone: Element = (this.$refs.dropzone as Element);

    input.addEventListener('change', e => {
      if (e.target instanceof HTMLInputElement) {
        this.onFilesSelect(e.target.files);
        dropzone.classList.remove(HOLDER_CLASS + '--dragover');
        e.target.value = '';
      }
    });
    dropzone.addEventListener('dragover', () => {
      dropzone.classList.add(HOLDER_CLASS + '--dragover');
      return false;
    });
    const dragleaveOrEndHandler = () => {
      dropzone.classList.remove(HOLDER_CLASS + '--dragover');
      return false;
    }
    dropzone.addEventListener('dragleave', dragleaveOrEndHandler);
    dropzone.addEventListener('dragend', dragleaveOrEndHandler);
    dropzone.addEventListener('dragenter', (e) => { e.preventDefault() });
    dropzone.addEventListener('dragover', (e) => { e.preventDefault() });
    dropzone.addEventListener('drop', (e: any) => {
      e.preventDefault();
      this.onFilesSelect(e.dataTransfer!.files);
    });
  }

  onFilesSelect (files: HTMLInputElement['files']) {
      if (!files) return;

      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', readerEvent => {
        const dataUrl = (readerEvent as any).target!.result!.toString();
        this.imgSrc = dataUrl;
      });

      reader.readAsDataURL(file);
  }

  onClick() {
    this.showDialog = true;
  }

  deleteImage() {
    this.imgSrc = '';
    const input: Element = (this.$refs.input as Element);
    input.nodeValue = null;
  }

  addImage() {
    if (this.imgSrc) {
      this.uploading = true;

      const base64ArrayParts = this.imgSrc.split(",")[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/);
      if (!base64ArrayParts || !base64ArrayParts[0]) return;

      const extension = mime.extension(base64ArrayParts[0]);
        
      const storageRef = firebaseService.storage.storage.ref().child(`${globalVariables.userId.value}/images/${md5(this.imgSrc)}.${extension}`);

      storageRef.putString(this.imgSrc, 'data_url').then((snapshot: any) => {
        return storageRef.getDownloadURL();
      }).then((url: string) => {
        this.commands.image({
          src: url
        });
        this.uploading = false;
        this.closeDialog();
      });
    } else if (this.validateLink(this.url)) {
      this.commands.image({
        src: this.url
      });
      this.closeDialog();
    }
  }

  closeDialog() {
    this.deleteImage();
    this.url = '';
    this.showDialog = false;
  }

  validateLink(link: string): boolean {
    return !!link && !!link.match(/(https?|ftp):\/\/(-.)?([^\s/?.#-]+.?)+(\/[^\s]*)?$/i);
  }
}
</script>
