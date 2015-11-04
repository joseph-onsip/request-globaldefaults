# request-globaldefaults

This module helps provide a way to set "global" defaults for `request` (see https://github.com/request/request/issues/1441). See `test/` for usage examples. Note that the defaults aren't *truly* global, as they must be set on particular instances of `request` in [Node's module cache](https://nodejs.org/api/modules.html#modules_module_caching_caveats).
