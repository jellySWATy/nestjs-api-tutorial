import {
  Controller,
  Post,
  UseGuards,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { BookmarkChangeGuard } from './guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarks: BookmarkService) {}
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarks.createBookmark(userId, dto);
  }

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarks.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarks.getBookmarkById(userId, bookmarkId);
  }

  @UseGuards(BookmarkChangeGuard)
  @Patch(':id')
  editBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarks.editBookmarkById(bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(BookmarkChangeGuard)
  @Delete(':id')
  deleteBookmarkById(@Param('id', ParseIntPipe) bookmarkId: number) {
    return this.bookmarks.deleteBookmarkById(bookmarkId);
  }
}
